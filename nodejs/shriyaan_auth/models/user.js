const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/authtestapp', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
});

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: Number
});

module.exports = mongoose.model('User', userSchema);
