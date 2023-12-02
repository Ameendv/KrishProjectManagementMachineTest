const express = require('express');
const router = express.Router();
const moviesServices = require('../services/movies.service')
const authorize = require('../_middleware/authorize');
const Joi = require('joi');
const validateRequest = require ('../_middleware/validate-request')

router.post('/addMovie', authorize(), addMovieSchema,  addMovie)
router.get('/getMovies', authorize(), getMovies)
router.put('/updateMovie/:id', authorize(), updateMovieSchema, updateMovie)
router.delete('/deleteMovie/:id', authorize(), deleteMovie)



function addMovie(req, res, next){
  moviesServices.addMovie(req.body).then(response=>{
    res.json(response)
  }).catch(next)
}

function getMovies(req, res, next){
  moviesServices.getMovies(req.body).then(response=>{
    res.json(response)
  }).catch(next)
}

function updateMovie(req, res, next){
  moviesServices.updateMovie(req.params.id, req.body).then(response=>{
    res.json(response)
  }).catch(next)
}

function deleteMovie(req, res, next){
  moviesServices.deleteMovie(req.params.id).then(response=>{
    res.json(response)
  }).catch(next)
}



function addMovieSchema(req, res, next) {
  const schema = Joi.object({
      title: Joi.string().required(),
      release_date: Joi.date().iso().required(),
      director: Joi.string().required(),
      genre: Joi.string().required(),
      trailer_url: Joi.string().uri().required(),
      budget: Joi.number().positive().required(),
      budget_unit: Joi.string().required()
  });

  validateRequest(req, next, schema);
}

function updateMovieSchema(req, res, next) {
  const schema = Joi.object({
      title: Joi.string(),
      release_date: Joi.date().iso(),
      director: Joi.string(),
      genre: Joi.string(),
      trailer_url: Joi.string().uri(),
      budget: Joi.number().positive(),
      budget_unit: Joi.string()
  }).min(1);

  validateRequest(req, next, schema);
}




  
  


module.exports = router;