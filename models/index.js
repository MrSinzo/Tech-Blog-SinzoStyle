const User = require('./User');
const Subject = require('./Subject');

User.hasMany(Subject, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Subject.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Subject };