const express = require('express');
const router = express.Router();
const { getAllRestaurants, addRestaurant } = require('../controllers/restaurantController');
const protect = require('../middleware/authMiddleware');

router.get('/', getAllRestaurants);
router.post('/', protect, addRestaurant);

module.exports = router;
