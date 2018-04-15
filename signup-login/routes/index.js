const routes = require('express').Router();

routes.route('/')
.get(function(req, res, next){
  res.status(200).json({message: 'GET received at "/"'});
  console.dir(req.body);
  next();
}).post(function(req, res, next){
  res.status(200).json({message: 'POST received at "/"'});
  next();
});

/*
 * User API calls
 */
routes.use('/signup', require('./signupRouter'));
routes.use('/login', require('./loginRouter'));
routes.user('/signout', require('./signoutRouter'))

module.exports = routes;
