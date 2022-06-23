"use strict";
const router = require("express").Router();
const { teacherModel } = require("../models/index");
const { courseModel, classModel } = require("../models/index");
const bearer = require("../middlewares/bearer");
const acl = require("../middlewares/acl");

router.get("/allteachers", bearer, async (req, res) => {
  let teachers = await teacherModel.findAll();
  res.status(200).json({
    teachers: teachers,
  });
});
router.get("/teacher/:id", bearer, async (req, res) => {
  let teacher = await teacherModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({
    teacher: teacher,
  });
});
router.put("/teacher/:id", bearer, acl("delete"), async (req, res) => {
  let teacher = await teacherModel.findOne({
    where: {
      id: req.params.id,
    },
  });

  let updatedTeacher = await teacher.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    courseId: req.body.courseId,
  });
  res.status(200).json({
    "updated teacher succesfully with the following info": updatedTeacher,
  });
});
router.delete("/teacher/:id", bearer, acl("delete"), async (req, res) => {
  let teacher = await teacherModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  let deletedTeacher = await teacher.destroy();
  res.status(200).json({
    "deleted teacher succesfully with the following info": deletedTeacher,
  });
});

//for teachers to choose courses
router.post(
  "/add-course-toTeacher",
  bearer,
  acl("delete"),
  async (req, res) => {
    const { userName, courseName } = req.body;
    let teacher = await teacherModel.findOne({
      where: {
        userName: userName,
      },
    });

    let addCourses = await courseModel.findOne({
      where: {
        courseName: courseName,
      },
    });

    await teacher.addCourse(addCourses);
    res.status(201).json({
      Message: `Course ${addCourses.courseName} added to Teacher ${teacher.firstName}`,

      Teacher: teacher.firstName,
      id: teacher.id,
      courseName: addCourses.courseName,
      "Course description": addCourses.courseDescription,
    });
  }
);

//for teachers to see all their courses
router.get("/get-allCourses-for-teacher/:id", async (req, res) => {
  let teacher = await teacherModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  // let teacherCourses = await Teacher.crate({ name: 'the-teacher' })
  let courses = await teacher.getCourses();
  console.log("1111", await teacher.countCourses());
  // console.log('1111',await teacher.hasCourses());

  let allCourses = courses.map((element) => {
    console.log(element.dataValues.courseName);
    return {
      "course Name": element.dataValues.courseName,
      "course Description": element.dataValues.courseDescription,
      "course Image": element.dataValues.courseImg,
      "course id": element.dataValues.id,
    };
  });
  console.log(allCourses);
  res.json({
    TeacherName: `${teacher.firstName} ${teacher.lastName}`,
    TeacherCourses: allCourses,
  });
});

router.get(
  "/get-all-classes-for-course-for-teacher/:courseId/:teacherId",
  async (req, res) => {
    let classes = await classModel.findAll({
      where: {
        courseId: req.params.courseId,
        teacherId: req.params.teacherId,
      },
    });
    res.json({
      classes,
    });
  }
);

module.exports = router;
