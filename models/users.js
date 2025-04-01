const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

const USERS = sequelize.define("USERS", {
  userId: {
    type: DataTypes.INTEGER(4).ZEROFILL,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "defaultPicture.png",
  },
  fonction: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "USER",
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  followers: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
  },
  following: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
  },
  like: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "",
  },
});

module.exports = USERS;
