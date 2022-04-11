'use strict';

const express = require('express');
const {classModel} = require('../models/index');
const router = express.Router();
const bearer = require('../middlewares/bearer');

router.get('/classes',bearer,getAllClasses);
router.post('/classes',bearer,addClass);
router.get('classes/:id',bearer,getOneClass);
router.put('classes/:id',bearer,updateClass);
router.delete('classes/:id',bearer,deleteClass);







async function getAllClasses(req,res){
    let classes = await classModel.findAll();
    res.status(200).json(classes);
}


async function addClass(req, res){
    let body = req.body;
    let addedClass = await classModel.create(body);

res.status(201).json('new class was added succesfully',addedClass);

}

async function getOneClass(req, res){
    let classId = parseInt(req.params.id);
    let classes = await classModel.findOne({where :{id: classId}});
    res.status(200).json(classes);
}

async function updateClass(req, res){
let body = req.body;
let id = req.params.id;
const classes = classModel.findOne({where :{id: id}});
const updatedClass = await classModel.update(body);
res.status(201).send(`class ${updatedClass} was updated successfully`);
}

async function deleteClass(req, res){
let removedId = req.params.id;
let removedClass = await classModel.destroy({where : {id: removedId}})
res.status(204).send(`class ${removedClass} was deleted successfully`);
}

module.exports = router;