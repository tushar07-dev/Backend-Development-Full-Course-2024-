const express = require('express');
const path = require('path');
const app = express();
const User = require('./models/user');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/read', async (req, res) => {
    let users = await User.find();
    res.render("read", {users});
});

app.get('/delete/:id', async (req, res) => {
    await User.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
});

app.post('/update/:id', async (req, res) => {
    let { name, email, image } = req.body;
    await User.findOneAndUpdate({_id: req.params.id}, {name, image, email}, {new: true});
    res.redirect("/read");
});

app.get('/edit/:id', async (req, res) => {
    let user = await User.findOne({_id: req.params.id});
    // console.log(userDetais);
    res.render("edit", {user});
})

app.post('/create', async (req, res) => {
    try {
        let { name, email, image } = req.body;
        await User.create({ name, email, image });
        res.redirect("/read");
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});