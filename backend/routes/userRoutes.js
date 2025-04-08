const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/register', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json(user);
});

module.exports = router;
