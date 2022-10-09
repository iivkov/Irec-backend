const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    // timezone: config.timezone,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "users_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "users_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.yards = require("./yard.model.js")(sequelize, Sequelize);
db.recyclings = require("./recycling.model.js")(sequelize, Sequelize);
db.yards.hasMany(db.recyclings, { as: "recyclings" });
db.recyclings.belongsTo(db.yards, {
  foreignKey: "yardId",
  as: "yard",
});

db.user.hasMany(db.recyclings, { as: "recyclings" });
db.recyclings.belongsTo(db.user, {
  foreignKey: "userId",
  as: "user",
});

// db.yard = require("../models/yard.model.js")(sequelize, Sequelize);
// db.recycling = require("../models/recycling.model.js")(sequelize, Sequelize);
// db.user.hasMany(db.recycling, { as: "recyclings" });
// db.recycling.belongsTo(db.user, {
//   foreignKey: "userId",
//   as: "user",
// });

db.ROLES = ["consumer", "recycler"];
module.exports = db;