const Restaurant = require('../models/Restaurant');

const getAllRestaurants = async (req, res) => {
  const data = await Restaurant.find();
  res.json(data);
};

const addRestaurant = async (req, res) => {
  const { name, description, location, image } = req.body;
  const restaurant = new Restaurant({ name, description, location, image });
  await restaurant.save();
  res.status(201).json(restaurant);
};

module.exports = { getAllRestaurants, addRestaurant };
