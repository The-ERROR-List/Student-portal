'use strict';

const express = require('express');
const {courseModel} = require('../models/index');
const router = express.Router();



router.post('/courses',addCourse);
router.get('/courses',getAllcourses);
router.get('courses/:id',getOneCourse);
router.put('courses/:id',updateCourse);
router.delete('courses/:id',deleteCourse);




async function addCourse(req, res){
    let body = req.body;
    let addedCourse = await courseModel.create(body);

res.status(201).json('new class was added succesfully',addedCourse);

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
res.status(201).send(`class ${updatedCourse} was updated successfully`);
}

async function deleteCourse(req, res){
let removedId = req.params.id;
let removedCourse = await courseModel.destroy({where : {id: removedId}})
res.status(204).send(`class ${removedCourse} was deleted successfully`);
}

module.exports = router;