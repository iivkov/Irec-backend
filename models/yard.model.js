module.exports = (sequelize, Sequelize) => {
  const Yard = sequelize.define("yard", {
    name: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    website: {
      type: Sequelize.STRING
    }
  });
  return Yard;
};