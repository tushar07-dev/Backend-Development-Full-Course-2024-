require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/authtestapp', {
//     useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // Remove the deprecated option
//   // useCreateIndex: true,
//   // Use the new option
//   useCreateIndexes: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
