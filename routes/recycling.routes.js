const { authJwt } = require("../middleware");

module.exports = app => {
    const recyclings = require("../controllers/recycling.controller.js");
    var router = require("express").Router();
    // Create a new Recycling
    router.post("/", [authJwt.verifyToken, authJwt.isRecycler], recyclings.createRecycling);
    // Retrieve all Recyclings
    router.get("/", [authJwt.verifyToken, authJwt.isRecycler], recyclings.findAllRecyclings);
    // Retrieve a single Recycling with id
    router.get("/:id", [authJwt.verifyToken, authJwt.isRecycler], recyclings.findOneRecycling);
    // Update a Recycling with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isRecycler], recyclings.updateRecycling);
    // Delete a Recycling with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isRecycler], recyclings.deleteRecycling);
    // Create a new Recycling
    router.delete("/", [authJwt.verifyToken, authJwt.isRecycler], recyclings.deleteAllRecyclings);
    app.use('/api/recyclings', router);
  };