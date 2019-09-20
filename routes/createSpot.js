'use strict';

const { Router } = require('express');
const router = Router();
const Spot = require('../models/spot');
const User = require('../models/user');
const routeGuardMiddleware = require('./../controllers/route-guard-middleware');



const chooseCity = [
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

 //GET home page 

router.get('/create/:userId', routeGuardMiddleware, (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => { 
      const data = {chooseCity};
      res.render('createSpot', data);
  })
    .catch(err => console.log(err));
});

router.post('/create/:userId', (req, res, next) => {
const data = {   
  name: req.body.name,
  address: req.body.address,
  city: req.body.city,
  spotType: req.body.spotType,
  lat: req.body.lat,
  lng: req.body.lng,
  description: req.body.description,
  userId: req.params.userId}

  console.log("REQ.BODY ",data)
  
  Spot.create(data)
    .then(spot => {
      //todo
      User.findByIdAndUpdate(req.params.userId, {$push: {spotList: spot._id}})
        .then((user) => {
          console.log(user);
          res.redirect(`/spot/${spot._id}`)
        });
    })
    .catch(error => {
      console.log(error);
      res.redirect('/create/:userId');
    });
});

router.get(`/spot/:id`, (req, res, next) => {
  Spot.findById(req.params.id)
  .populate("userId")
  .then(spot => {
      res.render('spot', spot)
    });
});

router.get(`/spot/delete/:_id`, (req, res, next) => {
  const spotId = req.params._id;
  Spot.findByIdAndDelete(spotId)
    .then(() => {
      res.redirect(`/profile/${req.session.user._id}`);
    });
});

// router.get()
module.exports = router;