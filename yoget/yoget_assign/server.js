const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define city and vehicle data
const cities = [
  { name: 'Yapkashnagar', distance: 60 },
  { name: 'Lihaspur', distance: 50 },
  { name: 'Narmis City', distance: 40 },
  { name: 'Shekharvati', distance: 30 },
  { name: 'Nuravgram', distance: 20 }
];

const vehicles = [
  { kind: 'EV Bike', range: 60, count: 2 },
  { kind: 'EV Car', range: 100, count: 1 },
  { kind: 'EV SUV', range: 120, count: 1 }
];

// API endpoint to get city and vehicle data
app.get('/api/data', (req, res) => {
  res.json({ cities, vehicles });
});

// API endpoint to handle cop choices and simulate capture
app.post('/api/capture', (req, res) => {
  // Logic to handle cop choices and simulate capture
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
