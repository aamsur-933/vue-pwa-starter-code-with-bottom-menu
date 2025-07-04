const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const attendances = sequelize.define(
    'attendances',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

work_in_time: {
        type: DataTypes.DATE,

      },

work_in_latitude: {
        type: DataTypes.DECIMAL,

      },

work_in_longitude: {
        type: DataTypes.DECIMAL,

      },

work_out_time: {
        type: DataTypes.DATE,

      },

work_out_latitude: {
        type: DataTypes.DECIMAL,

      },

work_out_longitude: {
        type: DataTypes.DECIMAL,

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

  attendances.associate = (db) => {

    db.attendances.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.attendances.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return attendances;
};

