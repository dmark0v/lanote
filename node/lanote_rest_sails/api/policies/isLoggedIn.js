module.exports = function(req, res, next) {
  console.log('its a login policy');  
  if (req.session.authenticated) {
    return next();
  }
  return res.forbidden('You are not permitted to perform this action.');
};

