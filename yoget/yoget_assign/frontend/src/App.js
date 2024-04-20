import React, { useState, useEffect } from 'react';
import CitySelection from './CitySelection';
import VehicleSelection from './VehicleSelection';
import Result from './Result';

function App() {
  const [currentCop, setCurrentCop] = useState(1);
  const [copsData, setCopsData] = useState([]);
  const [criminalLocation, setCriminalLocation] = useState(null);

  // Simulate criminal location on component mount
  useEffect(() => {
    const randomCity = Math.floor(Math.random() * cities.length);
    setCriminalLocation(cities[randomCity].name);
  }, []);

  const handleCitySelect = (cityName) => {
    setCopsData((prevData) => [
      ...prevData,
      { cop: currentCop, city: cityName, vehicle: null },
    ]);
    setCurrentCop(currentCop + 1);
  };

  const handleVehicleSelect = (vehicleName, cityDistance) => {
    setCopsData((prevData) =>
      prevData.map((copData) =>
        copData.cop === currentCop - 1
          ? { ...copData, vehicle: vehicleName }
          : copData
      )
    );
  };

  const handleAllCopsSelected = () => {
    const isSuccessful = copsData.some(
      (copData) => copData.city === criminalLocation
    );
    const capturedBy = isSuccessful
      ? copsData.find((copData) => copData.city === criminalLocation).cop
      : null;
    setCopsData([]);
    setCurrentCop(1);
    alert(`Game Over! Result: ${isSuccessful ? 'Successful' : 'Failed'}`);
  };

  const allCopsSelected = copsData.length === 3;

  return (
    <div className="App">
      <h1>Catch the Criminal</h1>
      {copsData.length < 3 ? (
        <CitySelection
          onCitySelect={handleCitySelect}
          copNumber={currentCop}
        />
      ) : null}
      {copsData.length > 0 && copsData[copsData.length - 1].city ? (
        <VehicleSelection
          cityDistance={cities.find(
            (city) => city.name === copsData[copsData.length - 1].city
          ).distance}
          onVehicleSelect={handleVehicleSelect}
        />
      ) : null}
      {/* {allCopsSelected && (
        <Result isSuccessful={isSuccessful} capturedBy={capturedBy} />
      )} */}
      {allCopsSelected && (
        <button onClick={handleAllCopsSelected}>Play Again</button>
      )}
    </div>
  );
}

export default App;

// Replace with your actual city data
const cities = [
  { name: 'Yapkashnagar', distance: 60 },
  { name: 'Lihaspur', distance: 50 },
  { name: 'Narmis City', distance: 40 },
  { name: 'Shekharvati', distance: 30 },
  { name: 'Nuravgram', distance: 20 },
];
