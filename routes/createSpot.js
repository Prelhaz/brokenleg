'use strict';

const { Router } = require('express');
const router = Router();
const createSpots = require('../models/spots');

router.get('/create', (req, res, next) => {
res.render('createSpot');

});

// ---------------- GET SPOTS ----------------

router.get("/create", (req, res, next) => {
  createSpots.find()
    .then(spots => {
      res.render("createSpot", {
        spots
      });
    })
    .catch(next);
});
// ---------------- ADD SPOTS TO THE DATA BASE -------------
router.post("/spots", (req, res, next) => {

  createSpots.create({
    name: req.body.name, 
    adress: req.body.adress,
    lat: req.body.lat,
    lng: req.body.lng,
    description: req.body.description
  }).then(() => {
    res.redirect("/createSpot");
  });
});

//------------------------ EDIT SPOTS ----------------
router.get("/createSpots/:spotsId/editspots", (req, res, next) => {
  let spotsId = req.params.spotsId
  createSpots.findById(spotsId)
    .then(spots => {
      res.render("/editspots", { spots });
    })
});

router.post("/createSpots/:spotsId/editspots", (req, res, next) => {
  let spotsId = req.params.spotsId
  createSpots.findByIdAndUpdate(spotsId, {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  }).then(() => {
    res.redirect("/editspots/"+ spotsId);
  });
});

//------------------------ DELETE SPOTS ----------------

router.get("/createSpots/:spotsId/delete", (req, res, next) => {
  let spotsId = req.params.spotsId
// grab the ID aand use it as an argument for deleting
  createSpots.findByIdAndDelete(spotsId)
    .then(() => {
      res.redirect("/createSpot");
    })
});


module.exports = router;
