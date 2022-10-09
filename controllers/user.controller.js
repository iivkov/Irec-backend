const db = require("../models");
const User = db.user;

// exports.allAccess = (req, res) => {
//     res.status(200).send("Sadržaj namijenjen svima...");
// };
// exports.userBoard = (req, res) => {
//     res.status(200).send("Korisnički sadržaaaj!");
// };
exports.consumerPanel = (req, res) => {
    res.status(200).send("Sadržaj namijenjen consumeru...");
};
exports.recyclerPanel = (req, res) => {
    res.status(200).send("Sadržaj namijenjen recycleru...");
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.findAll({include: ["recyclings"]})
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Dogodila se pogrješka pri dohvaćanju korisnika!"
        });
      });
  };
// Find a single User with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findByPk(id, {include: ["recyclings"]})
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: "Korisnik oznake " + id + " nije pronađen!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Dogodila se pogrješka pri dohvaćanju korisnika oznake " + id + "!"
        });
      });
  };