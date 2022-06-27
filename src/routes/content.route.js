"use strict";

const express = require("express");
const { contentModel } = require("../models/index");
const router = express.Router();

const bearer = require("../middlewares/bearer");
const acl = require("../middlewares/acl");

router.post("/content/:id", bearer, acl("update"), addContent);
router.get("/content-for-class/:id", bearer, getContent); // classId in params
router.get("/content/:id",bearer,getOneContent)
// router.get("/getCAbycat",bearer,getbyCategoryContent)
router.patch('/content/:id', bearer, acl('update'), updateContent); // contentId in params

router.delete("/content/:id", bearer, acl("update"), deleteContent); //contentId in params


async function addContent(req, res) {
  let { contentTitle, contentBody, contentLink, contentCategory } = req.body; //classId, content

  let addedContent = await contentModel.create({
    contentTitle: contentTitle,
    contentBody: contentBody,
    contentLink: contentLink,
    contentCategory: contentCategory,
    classId : req.params.id
  });
  res
    .status(201)
    .json({ "Content": addedContent });
  // you have to send classId in req.body
} // you need to have a class first

async function getOneContent(req,res){
let id = req.params.id;
let oneContent= await contentModel.findOne({where:{id:id}})
res.json({content : oneContent })
}
// async function getbyCategoryContent(req,res){
// let alldata = contentModel.findAll();

// }

async function getContent(req, res) {
  // gets all content for a class so you will have to send the classId in params
  let classId = req.params.id;
  let contents = await contentModel.findAll({ where: { classId: classId } });
  res.status(200).json(contents);
}

async function updateContent(req, res) {
  let {contentTitle,contentBody,contentLink} = req.body; // send content ONLY
  let id = req.params.id;
  let content = await contentModel.findOne({ where: { id: id } });
  const updatedContent = await content.update({
    id:content.id,
    contentTitle:contentTitle,
    contentBody:contentBody,
    contentLink:contentLink,
  });
  console.log(updatedContent);
  res.status(201).json({"content":updatedContent.dataValues});
}


async function deleteContent(req, res) {
  let deletedId = req.params.id;
  let deletedContent = await contentModel.destroy({ where: { id: deletedId } }); // returns boolean

  deletedContent
    ? res.status(200).send(`content was deleted successfully`)
    : res.status(200).send(`content cannot be deleted`);
}

module.exports = router;
