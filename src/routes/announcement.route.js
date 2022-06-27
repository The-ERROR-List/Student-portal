"use strict";

const express = require("express");
const { announcementModel } = require("../models/index");
const router = express.Router();

const bearer = require("../middlewares/bearer");
const acl = require("../middlewares/acl");

router.post("/announcement/:id", bearer, acl("update"), addAnnouncement);
router.get("/announcement-for-class/:id", bearer, getAnnouncement); // classId in params
router.get("/announcement/:id",bearer,getOneannouncement)
// router.get("/getCAbycat",bearer,getbyCategoryContent)
router.patch('/announcement/:id', bearer, acl('update'), updateAnnouncement); // contentId in params

router.delete("/announcement/:id", bearer, acl("update"), deleteAnnouncement); //contentId in params


async function addAnnouncement(req, res) {
  let { announcementTitle, announcementBody, announcementLink } = req.body; //classId, content

  let addedContent = await announcementModel.create({
    announcementTitle: announcementTitle,
    announcementBody: announcementBody,
    announcementLink: announcementLink,
    classId : req.params.id
  });
  res
    .status(201)
    .json({ "announcement": addedContent });
  // you have to send classId in req.body
} // you need to have a class first

async function getOneannouncement(req,res){
let id = req.params.id;
let oneAnnouncement= await announcementModel.findOne({where:{id:id}})
res.json({announcement : oneAnnouncement })
}
// async function getbyCategoryContent(req,res){
// let alldata = contentModel.findAll();

// }

async function getAnnouncement(req, res) {
  // gets all content for a class so you will have to send the classId in params
  let classId = req.params.id;
  let announcements = await announcementModel.findAll({ where: { classId: classId } });
  res.status(200).json(announcements);
}

async function updateAnnouncement(req, res) {
  let {announcementTitle,announcementBody,announcementLink} = req.body; // send content ONLY
  let id = req.params.id;
  let announcement = await announcementModel.findOne({ where: { id: id } });
  const updatedAnnouncement = await announcement.update({
    id:announcement.id,
    announcementTitle:announcementTitle,
    announcementBody:announcementBody,
    announcementLink:announcementLink,
  });
//   console.log(updatedContent);
  res.status(201).json({"announcement":updatedAnnouncement.dataValues});
}


async function deleteAnnouncement(req, res) {
  let deletedId = req.params.id;
  let deletedAnnouncement = await announcementModel.destroy({ where: { id: deletedId } }); // returns boolean

  deletedAnnouncement
    ? res.status(200).send(`announcement was deleted successfully`)
    : res.status(200).send(`announcement cannot be deleted`);
}

module.exports = router;
