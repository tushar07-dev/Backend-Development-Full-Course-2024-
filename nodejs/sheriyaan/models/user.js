const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/testapp1", { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
    image: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);