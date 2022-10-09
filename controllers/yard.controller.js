const db = require("../models");
const Yard = db.yards;
// const Recycling = db.recyclings;

// Create and Save a new Yard
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name || !req.body.address || !req.body.phone || !req.body.website) {
      res.status(400).send({
        message: "Potrebno je unijeti sve podatke!"
      });
      return;
    }
    // Create a Yard
    const yard = {
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      website: req.body.website
    };
    // Save Yard in the database
    Yard.create(yard)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se pogrješka pri dodavanju novog dvorišta!"
        });
      });
  };
// Retrieve all Yards from the database.
exports.findAll = (req, res) => {
    // const name = req.query.name;
    // var condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
    Yard.findAll({include: ["recyclings"]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se pogrješka pri dohvaćanju dvorišta!"
        });
      });
  };
// Find a single Yard with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Yard.findByPk(id, {include: ["recyclings"]})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "Dvorište oznake " + id + " nije pronađeno!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Dogodila se pogrješka pri dohvaćanju dvorišta oznake " + id + "!"
        });
      });
  };
// Update a Yard by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    if (!req.body.name || !req.body.address || !req.body.phone || !req.body.website) {
      res.status(400).send({
        message: "Potrebno je unijeti sve podatke!"
      });
      return;
    }
    Yard.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Podatci o dvorištu uspješno su promijenjeni!"
          });
        } else {
          res.send({
            message: "Podatke o dvorištu oznake " + id + " nije moguće promijeniti!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Pogrješka pri izmjeni podataka o dvorištu oznake " + id + "!"
        });
      });
  };
// Delete a Yard with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Yard.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Dvorište je uspješno obrisano!"
          });
        } else {
          res.send({
            message: "Dvorište oznake " + id + " nije moguće obrisati jer ono nije pronađeno!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Nije moguće obrisati dvorište oznake " + id + "!"
        });
      });
  };
// Delete all Yards from the database.
exports.deleteAll = (req, res) => {
    Yard.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: "Sva dvorišta (njih " + nums + ") uspješno su obrisana!"});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se pogrješka pri brisanju svih dvorišta!"
        });
      });
  };