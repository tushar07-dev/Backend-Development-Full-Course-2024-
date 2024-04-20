import React, { useState } from 'react';

const cities = [
  { name: 'Yapkashnagar', distance: 60 },
  { name: 'Lihaspur', distance: 50 },
  { name: 'Narmis City', distance: 40 },
  { name: 'Shekharvati', distance: 30 },
  { name: 'Nuravgram', distance: 20 },
];

function CitySelection({ onCitySelect }) {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleCitySelection = () => {
    if (selectedCity) {
      onCitySelect(selectedCity);
    }
  };

  return (
    <div>
      <h2>Choose a City to Investigate:</h2>
      <select onChange={handleCityChange} value={selectedCity}>
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name} ({city.distance} KM)
          </option>
        ))}
      </select>
      <button onClick={handleCitySelection} disabled={!selectedCity}>
        Select City
      </button>
    </div>
  );
}

export default CitySelection;
