const passport = require("passport");

require("./serlializers");
require("./localStrategy");

module.exports = app => {
  app.use(passport.initialize());
  app.use(passport.session());
};
