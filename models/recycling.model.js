module.exports = (sequelize, Sequelize) => {
    const Recycling = sequelize.define("recycling", {
      solvents: {
        type: Sequelize.DOUBLE
      },
      acids: {
        type: Sequelize.DOUBLE
      },
      pesticides: {
        type: Sequelize.DOUBLE
      },
      metals: {
        type: Sequelize.DOUBLE
      },
      paper: {
        type: Sequelize.DOUBLE
      },
      textile: {
        type: Sequelize.DOUBLE
      },
      batteries: {
        type: Sequelize.DOUBLE
      },
      tires: {
        type: Sequelize.DOUBLE
      },
      glass: {
        type: Sequelize.DOUBLE
      },
      plastic: {
        type: Sequelize.DOUBLE
      }
    });
    return Recycling;
  };