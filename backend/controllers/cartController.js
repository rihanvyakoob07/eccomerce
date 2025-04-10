const Cart = require('../models/Cart');

const getCart = async (req, res) => {
  const { userId } = req.params;
  const cart = await Cart.findOne({ userId });
  res.json(cart || { userId, items: [] });
};

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [{ productId, quantity }] });
  } else {
    const index = cart.items.findIndex(item => item.productId === productId);
    if (index > -1) {
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
  }

  await cart.save();
  res.json(cart);
};

module.exports = { getCart, addToCart };