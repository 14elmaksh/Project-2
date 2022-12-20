const sequelize = require('../config/connection');
const { Book, Location } = require('../models');

const bookData = require('./bookData.json');
const locationData = require('./locationData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const locations = await Location.bulkCreate(locationData, {
    individualHooks: true,
    returning: true,
  });

  for (const book of bookData) {
    await Book.create({
      ...book,
      // ask instructor about this it should be location or contact
      locationId: locations[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();


