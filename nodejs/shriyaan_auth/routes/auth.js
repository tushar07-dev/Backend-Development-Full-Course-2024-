const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/auth/login');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.redirect('/auth/login');
        }
        req.user = user;
        next();
    });
}

// GET register page
router.get('/register', (req, res) => {
    res.render('register');
});

// POST register
router.post('/register', async (req, res) => {
    const { username, email, password, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        username,
        email,
        password: hashedPassword,
        age
    });
    await user.save();
    res.redirect('/auth/login');
});

// GET login page
router.get('/login', (req, res) => {
    res.render('login');
});

// POST login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.redirect('/auth/dashboard');
    } else {
        res.redirect('/auth/login');
    }
});

// GET dashboard
router.get('/dashboard', authenticateToken, async (req, res) => {
    const user = await User.findById(req.user._id);
    res.render('dashboard', { user });
});

// GET logout
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
});

module.exports = router;
