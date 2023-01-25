const User = require('./User');
const Subject = require('./Subject');
const Comment = require("./Comment")

User.hasMany(Subject, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Subject.belongsTo(User, {
  foreignKey: 'user_id'
});


Subject.hasMany(Comment, {
  foreignKey: 'subject_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Subject, {
  foreignKey: 'subject_id'
});


module.exports = { User, Subject , Comment};