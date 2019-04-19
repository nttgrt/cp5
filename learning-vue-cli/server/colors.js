const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'


const users = require("./users.js");
const User = users.model;

const colorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  title: String,
  rgbString: String,
});

const Color = mongoose.model('Color', colorSchema);


router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  // check parameters

  const color = new Color({
    user: req.user,
    title: req.body.title,
    rgbString: req.body.rgbString,
  });
  try {
    await color.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


// get my photos
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return photos
  try {
    let colors = await Color.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(colors);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
router.get("/all", async (req, res) => {
  try {
    let colors = await Color.find().sort({
      created: -1
    }).populate('user');
    return res.send(colors);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});
/*
// get one photo
router.get("/one/:id", async (req, res) => {
  try {
    var ObjectId = require('mongodb').ObjectID;
    let response = await Photo.findOne({ _id: ObjectId(req.params.id)}, function(err, obj) {
      if (err) throw(err);
    });
    res.send(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/", async (req, res) => {
  try {
    let commentObject = {
      userInfo: req.body.userInfo,
      userComment: req.body.comment,
      created: Date(Date.now()),
    }
    console.log("commentObject is:");
    console.log(commentObject);
    var ObjectId = require('mongodb').ObjectID;
    let response = await Photo.findOne({ _id: ObjectId(req.body.photoID)}, function(err, obj) {
      if (err) throw(err);
      obj.comments.push(commentObject);
      obj.save(function(err) {
        if(err) throw(err);
      });
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
})
*/
module.exports = {
  model: Color,
  routes: router,
}
