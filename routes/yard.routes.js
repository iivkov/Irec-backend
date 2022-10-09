const { authJwt } = require("../middleware");

module.exports = app => {
    const yards = require("../controllers/yard.controller.js");
    var router = require("express").Router();
    // Create a new Yard
    router.post("/", [authJwt.verifyToken, authJwt.isRecycler], yards.create);
    // Retrieve all Yards
    router.get("/", [authJwt.verifyToken, authJwt.isRecycler], yards.findAll);
    // Retrieve a single Yard with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isRecycler], yards.findOne);
    // Update a Yard with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isRecycler], yards.update);
    // Delete a Yard with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isRecycler], yards.delete);
    // Create a new Yard
    router.delete("/", [authJwt.verifyToken, authJwt.isRecycler], yards.deleteAll);
    app.use('/api/yards', router);
  };