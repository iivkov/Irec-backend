const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = app => {
  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });
  
  // // app.get("/api/test/all", controller.allAccess);
  // // app.get(
  // //   "/api/test/user",
  // //   [authJwt.verifyToken],
  // //   controller.userBoard
  // // );
  // app.get(
  //   "/api/test/consumer",
  //   [authJwt.verifyToken, authJwt.isConsumer],
  //   controller.consumerPanel
  // );
  // app.get(
  //   "/api/test/recycler",
  //   [authJwt.verifyToken, authJwt.isRecycler],
  //   controller.recyclerPanel
  // );
  const users = require("../controllers/user.controller.js");
  var router = require("express").Router();
  // Retrieve all Users
  router.get("/", [authJwt.verifyToken, authJwt.isRecycler], users.findAll);
  // Retrieve a single User with id
  router.get("/:id", [authJwt.verifyToken, authJwt.isRecycler], users.findOne);
  app.use('/api/users', router);
};

// const { authJwt } = require("../middleware");
// const controller = require("../controllers/user.controller");
// module.exports = function(app) {
  // app.use(function(req, res, next) {
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "x-access-token, Origin, Content-Type, Accept"
  //   );
  //   next();
  // });
  
  // // app.get("/api/test/all", controller.allAccess);
  // // app.get(
  // //   "/api/test/user",
  // //   [authJwt.verifyToken],
  // //   controller.userBoard
  // // );
  // app.get(
  //   "/api/test/consumer",
  //   [authJwt.verifyToken, authJwt.isConsumer],
  //   controller.consumerPanel
  // );
  // app.get(
  //   "/api/test/recycler",
  //   [authJwt.verifyToken, authJwt.isRecycler],
  //   controller.recyclerPanel
  // );
// };