const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateVATOrEmail = (req, res, next) => {
  // VAT
  User.findOne({
    where: {
      vat: req.body.vat
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Pogrješka! Već postoji račun s unesenim OIB-om!"
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Pogrješka! Već postoji račun s unesenom e-poštom!"
        });
        return;
      }
      next();
    });
  });
};
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Pogrješka! Razina pristupa " + req.body.roles[i] + " ne postoji!"
        });
        return;
      }
    }
  }
  
  next();
};
const verifySignUp = {
  checkDuplicateVATOrEmail: checkDuplicateVATOrEmail,
  checkRolesExisted: checkRolesExisted
};
module.exports = verifySignUp;