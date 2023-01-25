const sequelize = require('../config/connection');
const { User, Subject, Comment } = require('../models');

const userData = require("./userData.json");
const subjectData = require('./subjectData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
// both seeds data and assigns random numbers to them
  for (const subject of subjectData) {
    await Subject.create({
      ...subject,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for ( const comment of commentData) {
    await Comment.create({
      ...comment
      // subject_id: ???[Math.floor(Math.random() * subjectData.length)].id
    })
  }

  process.exit(0);
};

seedDatabase();