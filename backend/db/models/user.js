'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type:DataTypes.STRING, 
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};