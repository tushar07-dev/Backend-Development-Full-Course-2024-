const express = require('express'); // waiter
const app = express();

// menu
app.get('/', (req, res) => {
    res.send('Welcom to Hotel, How can i help');
})

app.get('/chicken', (req, res) => {
    res.send('yes sir, love to serve chicken');
})

app.get('/itali', (req, res) => {
    var custom_Itali = {
        name: 'rave itali',
        size: '10cm dia',
        is_sambar: true,
        is_chutney: false,
    }
    res.send(custom_Itali);
})


app.listen(3000, ()=> {
    console.log('listening on 3000 port');
});