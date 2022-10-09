const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;
const Recycling = db.recyclings;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { recyclings } = require("../models");

exports.signup = (req, res) => {
  if (!req.body.name || !req.body.surname || !req.body.vat || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Potrebno je unijeti sve podatke!"
    });
    return;
  }
  // Save new user to database
  User.create({
    name: req.body.name,
    surname: req.body.surname,
    vat: req.body.vat,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Novi korisnik uspješno je registriran!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Novi korisnik uspješno je registriran!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Korisnik nije pronađen!" });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Netočna zaporka!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("RAZINA_" + roles[i].name.toUpperCase());
        }
      });
      user.getRecyclings().then(recyclings => {
        res.status(200).send({
          id: user.id,
          name: user.name,
          surname: user.surname,
          vat: user.vat,
          email: user.email,
          roles: authorities,
          recyclings: recyclings,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({
      message: "Uspješno ste se odjavili!"
    });
  } catch (err) {
    this.next(err);
  }
};