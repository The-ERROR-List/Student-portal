'use strict';

const express = require('express');
const {courseModel} = require('../models/index');
const {teacherModel} = require ('../models/index');
const {classModel} = require ('../models/index');
const router = express.Router();
const bearer = require('../middlewares/bearer');
const acl = require('../middlewares/acl');



router.post('/courses',bearer,acl('delete'),addCourse);
router.get('/courses',bearer,getAllcourses);
router.get('/courses/:id',bearer,getOneCourse);
router.put('/courses/:id',bearer,acl('update'),updateCourse);
router.delete('/courses/:id',bearer,acl('delete'),deleteCourse);




async function addCourse(req, res){
    let body = req.body;
    let addedCourse = await courseModel.create(body);

res.status(201).json({'new course was added succesfully': addedCourse});

}



async function getAllcourses(req,res){
    let courses = await courseModel.findAll();
    res.status(200).json(courses);
}




async function getOneCourse(req, res){
    let courseId = parseInt(req.params.id);
    let courses = await courseModel.findOne({where :{id: courseId}});
    res.status(200).json(courses);
}

async function updateCourse(req, res){
let body = req.body;
let id = req.params.id;
const courses = courseModel.findOne({where :{id: id}});
const updatedCourse = await courseModel.update(body);
res.status(201).send({"course was updated successfully": updatedCourse});
}

async function deleteCourse(req, res){
let removedId = req.params.id;
let removedCourse = await courseModel.destroy({where : {id: removedId}})
res.status(204).json({"course was deleted successfully": removedCourse});
}


router.get('/allcourses-with-their-teachers',bearer,async(req, res)=>{
    let courses = await courseModel.findAll({
        include : [teacherModel] // all the teachers that teach this course
    });
    console.log(courses);
    res.status(200).json({
        courses: courses
    });
})

router.get('/allcourses-and-their-classes',bearer,async(req, res)=>{
    let courses = await courseModel.findAll({
        include : [classModel] // all the classes for this course
    });
    console.log(courses);
    res.status(200).json({
        courses: courses
    });
})

module.exports = router;