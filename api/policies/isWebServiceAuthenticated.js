module.exports = function(req, res, next) {
  var authorizationHeader = req.headers["authorization"] == null ? "" : req.headers["authorization"];

  sails.log.error("Has bearer token: " + hasValidFormatBearerToken(authorizationHeader));
  if (!req.isAuthenticated() && hasValidFormatBearerToken(authorizationHeader)) {
    sails.config.passport.authenticate('bearer', function(err, user, info) {
      if(user != false) {
        req.user = user;
      }
      next();
    })(req, res);
  } else {
    next();
  }

};

function hasValidFormatBearerToken(authorizationHeader) {
  return /Bearer\s+.*/.test(authorizationHeader)
}
