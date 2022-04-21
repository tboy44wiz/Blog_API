'use strict';


const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const { Model } = require('sequelize');
// import bcrypt from 'bcryptjs';
// import { Model } from 'sequelize';
const uuidV4 = v4;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('admin', 'user'),
    description: DataTypes.TEXT,
    social_media: DataTypes.ARRAY(DataTypes.STRING)
  }, {
    tableName: 'User',
    freezeTableName: true,
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(async (user) => {
    user.id = await uuidV4();
  });
  User.beforeCreate(async (user) => {
    user.password = await bcrypt.hashSync(user.password, 10);
  });


  return User;
};