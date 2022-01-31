'use strict';

const { Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      allowNull: false,
      type:DataTypes.STRING, 
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [4, 256],
        isEmail(value) {
          if (!Validator.isEmail(value)) {
            throw new Error('Must be an email.');
          }
        },
      },
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        len: [60, 60]
      },
    },
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};