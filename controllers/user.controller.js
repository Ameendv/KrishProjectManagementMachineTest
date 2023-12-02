const express = require('express');
const router = express.Router();
const userServices = require('../services/user.service');
const authorize = require('../_middleware/authorize');
const Joi = require('joi');
const validateRequest = require ('../_middleware/validate-request')



router.post('/createUser', createUserSchema, createUser)
router.post('/login', loginSchema, login)
router.post('/refreshToken',authorize(), refreshToken)



function createUser( req, res, next){
    userServices.createUser(req.body).then(response=>{
        res.json(response)
    }).catch(next)
}

function login( req, res, next){
    userServices.login(req.body).then(response=>{
        res.json(response)
    }).catch(next)
}
function refreshToken( req, res, next){
    userServices.refreshToken(req.body.refreshToken, req.user.id).then(response=>{
        console.log(response,'response')
        res.json(response)
    }).catch(next)
}
function createUserSchema(req, res, next) {
    const schema = Joi.object({
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
    });

    validateRequest(req, next, schema);
}

function loginSchema(req, res, next) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  });

  validateRequest(req, next, schema);
}

module.exports = router;