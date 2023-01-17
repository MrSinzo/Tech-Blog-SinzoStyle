const User = require('./User');
const Subject = require('./Subject');
const Post = require("./Post")

User.hasMany(Subject, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Subject.belongsTo(User, {
  foreignKey: 'user_id'
});

Subject.hasMany(Post, {
  foreignKey: 'subject_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(Subject, {
  foreignKey: 'subject_id'
});

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE' 
})

Post.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Subject , Post};