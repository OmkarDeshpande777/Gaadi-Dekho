import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FaHeart } from 'react-icons/fa';

function VehicleDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [vehicle, setVehicle] = useState(null);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [onRoadPrice, setOnRoadPrice] = useState(null);

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/vehicles/${id}`);
        setVehicle(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCities = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/cities');
        setCities(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehicle();
    fetchCities();
  }, [id]);

  useEffect(() => {
    const fetchOnRoadPrice = async () => {
      if (vehicle) {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/vehicles/${id}/onroad-price/${selectedCity}`
          );
          setOnRoadPrice(res.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchOnRoadPrice();
  }, [selectedCity, vehicle, id]);

  const handleFavorite = async () => {
    if (!user) {
      alert('Please login to add to favorites');
      return;
    }
    try {
      await axios.post(
        `http://localhost:5000/api/vehicles/${id}/favorite`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Added to favorites');
    } catch (error) {
      console.error(error);
      alert('Failed to add to favorites');
    }
  };

  if (!vehicle) return <div>Loading...</div>;

  return (
    <div className="container vehicle-details">
      <h1>{vehicle.brand} {vehicle.model}</h1>
      <div className="vehicle-info">
        <div>
          <img
            src={vehicle.images[0] || '/placeholder.jpg'}
            alt={`${vehicle.brand} ${vehicle.model}`}
          />
        </div>
        <div className="info-box">
          <p className="price">
            ₹{vehicle.exShowroomPrice.toLocaleString('en-IN')} (Ex-showroom)
          </p>
          <p>{vehicle.vehicleType}</p>
          <p>{vehicle.fuelType} | {vehicle.transmission}</p>
          <p>{vehicle.mileage} km/l</p>
          <button onClick={handleFavorite} className="favorite-btn">
            <FaHeart /> Add to Favorites
          </button>
        </div>
      </div>
      <div className="price-calculator">
        <h2>On-Road Price Calculator</h2>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          {cities.map((city) => (
            <option key={city.city} value={city.city}>{city.city}</option>
          ))}
        </select>
        {onRoadPrice && (
          <div>
            <p>Ex-Showroom Price: ₹{onRoadPrice.exShowroomPrice.toLocaleString('en-IN')}</p>
            <p>Road Tax: ₹{onRoadPrice.roadTaxAmount.toLocaleString('en-IN')}</p>
            <p>Registration Fee: ₹{onRoadPrice.registrationFee.toLocaleString('en-IN')}</p>
            <p>Insurance: ₹{onRoadPrice.insuranceAmount.toLocaleString('en-IN')}</p>
            <p>Other Charges: ₹{onRoadPrice.otherCharges.toLocaleString('en-IN')}</p>
            <p className="total">
              On-Road Price: ₹{onRoadPrice.onRoadPrice.toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </div>
      <div className="specifications">
        <h2>Specifications</h2>
        <div className="spec-grid">
          <div>
            <h3>Dimensions</h3>
            <p>Length: {vehicle.specifications.dimensions.length} mm</p>
            <p>Width: {vehicle.specifications.dimensions.width} mm</p>
            <p>Height: {vehicle.specifications.dimensions.height} mm</p>
            <p>Wheelbase: {vehicle.specifications.dimensions.wheelbase} mm</p>
            <p>Ground Clearance: {vehicle.specifications.dimensions.groundClearance} mm</p>
          </div>
          <div>
            <h3>Engine</h3>
            <p>Type: {vehicle.specifications.engine.type}</p>
            <p>Displacement: {vehicle.specifications.engine.displacement} cc</p>
            <p>Max Power: {vehicle.specifications.engine.maxPower}</p>
            <p>Max Torque: {vehicle.specifications.engine.maxTorque}</p>
          </div>
        </div>
        <div>
          <h3>Safety Features</h3>
          <ul>
            {vehicle.specifications.safety.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Features</h3>
          <ul>
            {vehicle.specifications.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default VehicleDetails;