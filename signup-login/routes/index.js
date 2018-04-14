const routes = require('express').Router();

routes.route('/')
.get(function(req, res, next){
  res.status(200).json({message: 'GET received at "/"'});
  next();
}).post(function(req, res, next){
  res.status(200).json({message: 'POST received at "/"'});
  next();
});

module.exports = routes;
