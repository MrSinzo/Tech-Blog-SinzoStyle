const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Subject extends Model {}

Subject.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  subjectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subjectInfo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_posted: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "user",
      key: 'id',
    },
  }
},
{
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'subject',
}
);

module.exports = Subject;