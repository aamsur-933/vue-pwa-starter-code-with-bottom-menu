const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const employees = sequelize.define(
    'employees',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

first_name: {
        type: DataTypes.TEXT,

      },

last_name: {
        type: DataTypes.TEXT,

      },

email: {
        type: DataTypes.TEXT,

      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  employees.associate = (db) => {

    db.employees.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.employees.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return employees;
};

