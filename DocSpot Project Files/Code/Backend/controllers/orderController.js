const Order = require('../models/Order');

const placeOrder = async (req, res) => {
  const { items, total } = req.body;
  const order = new Order({ customer: req.user.id, items, total });
  await order.save();
  res.status(201).json(order);
};

const getUserOrders = async (req, res) => {
  const orders = await Order.find({ customer: req.user.id }).populate('items.product');
  res.json(orders);
};

module.exports = { placeOrder, getUserOrders };
