"use strict";

const express = require("express");
const { contentModel } = require("../models/index");
const router = express.Router();

const bearer = require("../middlewares/bearer");
const acl = require("../middlewares/acl");

router.post("/content", bearer, acl("update"), addContent);
router.get("/content-for-class/:id", bearer, getContent); // classId in params
// router.put('/content/:id',bearer,acl('update'),updateClass);
router.delete("/content/:id", bearer, acl("update"), deleteContent); //contentId in params

async function addContent(req, res) {
  let body = req.body; //classId, content
  let addedContent = await contentModel.create(body);
  res
    .status(201)
    .json({ "new content was posted to class succesfully": addedContent });
  // you have to send classId in req.body
} // you need to have a class first

async function getContent(req, res) {
  // gets all content for a class so you will have to send the classId in params
  let classId = req.params.id;
  let contents = await contentModel.findAll({ where: { classId: classId } });
  res.status(200).json(contents);
}

// async function updateContent(req, res) {
//   let body = req.body;
//   let id = req.params.id;
//   const classes = classModel.findOne({ where: { id: id } });
//   const updatedClass = await classModel.update(body);
//   res.status(201).send(`class ${updatedClass} was updated successfully`);
// }

async function deleteContent(req, res) {
  let deletedId = req.params.id;
  let deletedContent = await contentModel.destroy({ where: { id: deletedId } }); // returns boolean
  
  deletedContent
    ? res.status(200).send(`content was deleted successfully`)
    : res.status(200).send(`content cannot be deleted`);
}

module.exports = router;
