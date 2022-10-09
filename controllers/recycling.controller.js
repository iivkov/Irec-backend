const db = require("../models");
const Recycling = db.recyclings;
const Op = db.Sequelize.Op;

// Create and Save a new Recycling
exports.createRecycling = (req, res) => {
    // Validate request
    if (!req.body.solvents || !req.body.acids || !req.body.pesticides || !req.body.metals || !req.body.paper || !req.body.textile || !req.body.batteries|| !req.body.tires || !req.body.glass || !req.body.plastic || !req.body.yardId || !req.body.userId) {
      res.status(400).send({
        message: "Potrebno je unijeti sve podatke!"
      });
      return;
    }
    // Create a Recycling
    const recycling = {
      solvents: req.body.solvents, 
      acids: req.body.acids, 
      pesticides: req.body.pesticides, 
      metals: req.body.metals, 
      paper: req.body.paper, 
      textile: req.body.textile, 
      batteries: req.body.batteries, 
      tires: req.body.tires, 
      glass: req.body.glass, 
      plastic: req.body.plastic,
      yardId: req.body.yardId,
      userId: req.body.userId
    };
    // Save Recycling in the database
    Recycling.create(recycling)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se pogrješka pri dodavanju novog recikliranja!"
        });
      });
  };
// Retrieve all Recyclings from the database.
exports.findAllRecyclings = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    // const id = req.params.id;
    // var condition = id ? { id: { [Op.iLike]: `%${id}%` } } : null;
    // Recycling.findAll({ where: condition })
    Recycling.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se pogrješka pri dohvaćanju recikliranja!"
        });
      });
  };
// Find a single Recycling with an id
exports.findOneRecycling = (req, res) => {
    const id = req.params.id;
    Recycling.findByPk(id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "Recikliranje oznake " + id + " nije pronađeno!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Dogodila se pogrješka pri dohvaćanju recikliranja oznake " + id + "!"
        });
      });
  };
// Update a Recycling by the id in the request
exports.updateRecycling = (req, res) => {
  if (!req.body.solvents || !req.body.acids || !req.body.pesticides || !req.body.metals || !req.body.paper || !req.body.textile || !req.body.batteries|| !req.body.tires || !req.body.glass || !req.body.plastic || !req.body.yardId || !req.body.userId) {
    res.status(400).send({
      message: "Potrebno je unijeti sve podatke!"
    });
    return;
  }
    const id = req.params.id;
    Recycling.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Podatci o recikliranju uspješno su promijenjeni!"
          });
        } else {
          res.send({
            message: "Podatke o recikliranju oznake " + id + " nije moguće promijeniti!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Pogrješka pri izmjeni podataka o recikliranju oznake " + id + "!"
        });
      });
  };
// Delete a Recycling with the specified id in the request
exports.deleteRecycling = (req, res) => {
    const id = req.params.id;
    Recycling.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Recikliranje je uspješno obrisano!"
          });
        } else {
          res.send({
            message: "Recikliranje oznake " + id + " nije moguće obrisati jer ono nije pronađeno!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Nije moguće obrisati recikliranje oznake " + id + "!"
        });
      });
  };
// Delete all Recyclings from the database.
exports.deleteAllRecyclings = (req, res) => {
    Recycling.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: "Sva recikliranja (njih " + nums + ") uspješno su obrisana!"});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se pogrješka pri brisanju svih recikliranja!"
        });
      });
  };