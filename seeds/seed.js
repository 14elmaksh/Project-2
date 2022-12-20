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
      // contactId: location[Math.floor(locations.length)].id,
      // locationId: 
    });
  }

  process.exit(0);
};

seedDatabase();


