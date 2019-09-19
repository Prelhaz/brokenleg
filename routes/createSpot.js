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


const city = [
  "Abrantes", "Agualva-Cacém", "Águeda", "Albergaria-a-Velha", "Albufeira", "Alcácer do Sal", "Alcobaça", "Alfena", "Almada",
  "Almeirim", "Alverca do Ribatejo", "Amadora", "Amarante", "Amora", "Anadia", "Angra do Heroísmo", "Aveiro", "Barcelos", "Barreiro",
  "Beja", "Borba", "Braga", "Bragança", "Caldas da Rainha", "Câmara de Lobos", "Caniço", "Cantanhede", "Cartaxo", "Castelo Branco", "Chaves",
  "Coimbra", "Costa da Caparica", "Covilhã", "Elvas", "Entroncamento", "Ermesinde", "Esmoriz", "Espinho", "Esposende", "Estarreja", "Estremoz",
  "Évora", "Fafe", "Faro", "Fátima", "Felgueiras", "Figueira da Foz", "Fiães", "Freamunde", "Funchal", "Fundão", "Gafanha da Nazaré", "Gandra", "Gondomar",
  "Gouveia", "Guarda", "Guimarães", "Horta", "Ílhavo", "Lagoa - Ilha de São Miguel", "Lagoa - Algarve", "Lagos", "Lamego", "Leiria", "Lisboa", "Lixa", "Loulé",
  "Loures", "Lourosa", "Macedo de Cavaleiros", "Machico", "Maia", "Mangualde", "Marco de Canaveses", "Marinha Grande", "Matosinhos", "Mealhada", "Mêda",
  "Miranda do Douro", "Mirandela", "Montemor-o-Novo", "Montijo", "Moura", "Odivelas", "Olhão da Restauração", "Oliveira de Azeméis", "Oliveira do Bairro",
  "Oliveira do Hospital", "Ourém", "Ovar", "Paços de Ferreira", "Paredes", "Penafiel", "Peniche", "Peso da Régua", "Pinhel", "Pombal", "Ponta Delgada", "Ponte de Sor",
  "Portalegre", "Portimão", "Porto", "Póvoa de Santa Iria", "Póvoa de Varzim", "Praia da Vitória", "Quarteira", "Queluz", "Rebordosa", "Reguengos de Monsaraz",
  "Ribeira Grande", "Rio Maior", "Rio Tinto", "Sabugal", "Sacavém", "Samora Correia", "Santa Comba Dão", "Santa Cruz", "Santa Maria da Feira", "Santana", "Santarém",
  "Santiago do Cacém", "Santo Tirso", "São João da Madeira", "São Mamede de Infesta", "São Pedro do Sul", "Lordelo", "Seia", "Seixal", "Senhora da Hora", "Serpa",
  "Setúbal", "Silves", "Sines", "Tarouca", "Tavira", "Tomar", "Tondela", "Torres Novas", "Torres Vedras", "Trancoso", "Trofa", "Valbom", "Vale de Cambra", "Valença",
  "Valongo", "Valpaços", "Vendas Novas", "Viana do Castelo", "Vila Baleira", "Vila do Conde", "Vila Franca de Xira", "Vila Nova de Famalicão", "Vila Nova de Foz Côa",
  "Vila Nova de Gaia", "Vila Nova de Santo André", "Vila Real", "Vila Real de Santo António", "Viseu", "Vizela"
];

const Spots = require('../models/spots');


 //GET home page 

router.get('/create', (req, res, next) => {
  Spots.find()
    .then((spots) => {
      const data ={
        spots,
        city
      }
      res.render('createSpot', data);
    })
    .catch(err => console.log(err));
});


// router.get('/createSpot', (req, res, next) => {
//   res.render('createSpot');
// });

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
      res.redirect('/createSpot');
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