const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

router.post('/', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

module.exports = router;
