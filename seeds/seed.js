const sequelize = require('../config/connection');
const { User, Subject } = require('../models');

const userData = require("./userData.json");
const subjectData = require('./subjectData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const subject of subjectData) {
    await Subject.create({
      ...subject,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();