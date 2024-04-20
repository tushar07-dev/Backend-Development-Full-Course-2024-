import React, { useState } from 'react';

const vehicles = [
  { name: 'EV Bike', range: 60, count: 2 },
  { name: 'EV Car', range: 100, count: 1 },
  { name: 'EV SUV', range: 120, count: 1 },
];

function VehicleSelection({ cityDistance, onVehicleSelect }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.range >= cityDistance
  );

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleVehicleSelection = () => {
    if (selectedVehicle) {
      onVehicleSelect(selectedVehicle);
    }
  };

  return (
    <div>
      <h2>Choose a Vehicle for {cityDistance} KM Journey:</h2>
      {availableVehicles.length > 0 ? (
        <div>
          <select onChange={handleVehicleChange} value={selectedVehicle}>
            <option value="">Select Vehicle</option>
            {availableVehicles.map((vehicle) => (
              <option key={vehicle.name} value={vehicle.name}>
                {vehicle.name} ({vehicle.range} KM Range)
              </option>
            ))}
          </select>
          <button onClick={handleVehicleSelection} disabled={!selectedVehicle}>
            Select Vehicle
          </button>
        </div>
      ) : (
        <p>No vehicles available for this distance.</p>
      )}
    </div>
  );
}

export default VehicleSelection;
