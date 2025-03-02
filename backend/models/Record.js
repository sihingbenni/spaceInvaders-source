module.exports = function(sequelize, DataTypes) {
  return sequelize.define("Record", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    timestamps: false
  });
};