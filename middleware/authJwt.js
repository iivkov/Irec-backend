const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "Nema tokena!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Pristup nije dopušten!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isRecycler = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "recycler") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Potrebna je razina pristupa RECYCLER!"
      });
      return;
    });
  });
};
isConsumer = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "consumer") {
          next();
          return;
        }
      }
      res.status(403).send({
        message: "Potrebna je razina pristupa CONSUMER!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isRecycler: isRecycler,
  isConsumer: isConsumer,
};
module.exports = authJwt;