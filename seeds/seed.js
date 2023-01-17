const sequelize = require('../config/connection');
const { User, Subject, Post } = require('../models');

const userData = require("./userData.json");
const subjectData = require('./subjectData.json');
const postData = require('./postData.json')

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

  for ( const post of postData) {
    console.log("aww snap");
    await Post.create({
      ...post,
      user_id: users[Math.floor(Math.random() * userData.length)].id,
      // subject_id: subject[Math.floor(Math.random() * subjectData.length)].id
    })
  }

  process.exit(0);
};

seedDatabase();