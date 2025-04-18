const express = require('express');
const { getCart, addToCart } = require('../controllers/cartController');
const router = express.Router();

router.get('/:userId', getCart);
router.post('/add', addToCart);

module.exports = router;
