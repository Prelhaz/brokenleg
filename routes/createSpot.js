'use strict';

const { Router } = require('express');
const router = Router();
// const createSpots = require('../models/spots');

// router.get('/create', (req, res, next) => {
// res.render('createSpot');

// });


// router.get("/create", (req, res, next) => {
//   createSpots.find()
//     .then(spots => {
//       res.render("createSpot", {
//         spots
//       });
//     })
//     .catch(next);
// });
// router.post("/spots", (req, res, next) => {

//   createSpots.create({
//     name: req.body.name, 
//     adress: req.body.adress,
//     lat: req.body.lat,
//     lng: req.body.lng,
//     description: req.body.description
//   }).then(() => {
//     res.redirect("/createSpot");
//   });
// });

// router.get("/createSpots/:spotsId/editspots", (req, res, next) => {
//   let spotsId = req.params.spotsId
//   createSpots.findById(spotsId)
//     .then(spots => {
//       res.render("/editspots", { spots });
//     })
// });

// router.post("/createSpots/:spotsId/editspots", (req, res, next) => {
//   let spotsId = req.params.spotsId
//   createSpots.findByIdAndUpdate(spotsId, {
//     name: req.body.name, 
//     adress: req.body.adress,
//     lat: req.body.lat,
//     lng: req.body.lng,
//     description: req.body.description
//   }).then(() => {
//     res.redirect("/editspots/"+ spotsId);
//   });
// });


// router.get("/createSpots/:spotsId/delete", (req, res, next) => {
//   let spotsId = req.params.spotsId
//   createSpots.findByIdAndDelete(spotsId)
//     .then(() => {
//       res.redirect("/createSpot");
//     }),
// });


// module.exports = router;




const Spots = require('../models/spots');


 //GET home page 

router.get('/create', (req, res, next) => {
  Spots.find()
    .then((spots) => {
      res.render('createSpot', { spots });
    })
    .catch(err => console.log(err));
});


router.get('/createSpot', (req, res, next) => {
  res.render('createSpot');
});

router.post('/createSpot', (req, res, next) => {
  const {
    name, type, latitude, longitude
  } = req.body;

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude]
  };
  const newSpot = new Spots({ name, type, location });

  newSpot.save()
    .then(() => {
      res.redirect('/createSpot');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.get('/editSpots/:id', (req, res, next) => {
  const spots = req.params.id;
  Spots.findById(spots)
    .then((spot) => {
      res.render('editSpots', spots);
    })
    .catch(err => console.log(err));
});

router.post('/editSpots/:id', (req, res, next) => {
  const {
    name, type, latitude, longitude,
  } = req.body;

  const location = {
    type: 'Point',
    coordinates: [longitude, latitude]
  };

  Spots.update({ _id: req.params.id }, { $set: { name, type, location } })
    .then(() => {
      res.redirect('/');
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post('/deleteSpots/:id', (req, res, next) => {
  const spots = req.params.id;
  Spots.findByIdAndDelete(spots)
    .then(() => {
      res.redirect('/deleteSpot');
    })
    .catch(err => console.log(err));
});

router.get('/api', (req, res, next) => {
  Spots.find()
    .then((spots) => {
      res.status(200).json({ spots });
    })
    .catch(error => console.log(error));
});


module.exports = router;