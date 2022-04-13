'use strict';
const router = require('express').Router();
const { teacherModel } = require('../models/index');
const {courseModel} = require ('../models/index');
const bearer = require('../middlewares/bearer');


router.get('/allteachers',bearer,async(req, res)=>{
    let teachers = await teacherModel.findAll();
    res.status(200).json({
        teachers: teachers
    });
})
// output:
// {
//     "teachers": [
//         {
//             "id": "3817877e-a756-49ca-8db0-b69e018e94b1",
//             "userId": "337f4fe7-6eae-4c00-8297-d2fa11b07854",
//             "firstName": "ibr",
//             "lastName": "lastName",
//             "gender": "male",
//             "nationality": "ionality",
//             "department": "it",
//             "createdAt": "2022-04-12T13:52:46.239Z",
//             "updatedAt": "2022-04-12T13:52:46.239Z",
//             "courses": []
//         },
//         {
//             "id": "b1f0765a-8703-43af-af63-f4cbcaca9942",
//             "userId": "ae731843-a5a2-4781-bfb5-86cd8bb02829",
//             "firstName": "nour",
//             "lastName": "lastName",
//             "gender": "male",
//             "nationality": "ionality",
//             "department": "it",
//             "createdAt": "2022-04-12T13:53:04.445Z",
//             "updatedAt": "2022-04-12T13:53:04.445Z",
//             "courses": []
//         }
//     ]
// }
router.get('/teacher/:id',bearer,async (req, res) => {
    let teacher = await teacherModel.findOne({
        where: {
            id: req.params.id
        }
    });
    res.status(200).json({
        teacher: teacher
    });

})
router.put('/teacher/:id',bearer,async (req, res) => {
    let teacher = await teacherModel.findOne({
        where: {
            id: req.params.id
        }
    }); 
    
    let updatedTeacher = await teacher.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    
    })
    res.status(200).json({
        'updated teacher succesfully with the following info': updatedTeacher,
    });
})
router.delete('/teacher/:id',bearer,async (req, res) => {
    let teacher = await teacherModel.findOne({
        where: {
            id: req.params.id
        }
    });
    let deletedTeacher = await teacher.destroy();
    res.status(200).json({
        'deleted teacher succesfully with the following info': deletedTeacher,
    });
})

router.get('/allteachers-with-their-courses',bearer,async(req, res)=>{
    let teachers = await teacherModel.findAll({
        include : [courseModel] // // all the courses taught by this teacher
    });
    res.status(200).json({
        teachers: teachers //wrong
    });
})


module.exports = router;