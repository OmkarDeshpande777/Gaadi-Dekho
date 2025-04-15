import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaFilter } from 'react-icons/fa';

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({
    brand: '',
    vehicleType: '',
    fuelType: '',
    transmission: '',
    minPrice: '',
    maxPrice: '',
  });
  const [brands, setBrands] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [brandsRes, typesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/vehicles/brands'),
          axios.get('http://localhost:5000/api/vehicles/types'),
        ]);
        setBrands(brandsRes.data);
        setTypes(typesRes.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const params = new URLSearchParams(filters).toString();
        const res = await axios.get(`http://localhost:5000/api/vehicles?${params}`);
        setVehicles(res.data.vehicles);
      } catch (error) {
        console.error(error);
      }
    };
    fetchVehicles();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="container home">
      <h1>Explore Cars</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div className="filter-panel">
          <h2>
            <FaFilter /> Filters
          </h2>
          <div>
            <label>Brand</label>
            <select name="brand" value={filters.brand} onChange={handleFilterChange}>
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Vehicle Type</label>
            <select name="vehicleType" value={filters.vehicleType} onChange={handleFilterChange}>
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Fuel Type</label>
            <select name="fuelType" value={filters.fuelType} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
            </select>
          </div>
          <div>
            <label>Transmission</label>
            <select name="transmission" value={filters.transmission} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>
          </div>
          <div>
            <label>Price Range</label>
            <input
              type="number"
              name="minPrice"
              placeholder="Min Price"
              value={filters.minPrice}
              onChange={handleFilterChange}
            />
            <input
              type="number"
              name="maxPrice"
              placeholder="Max Price"
              value={filters.maxPrice}
              onChange={handleFilterChange}
            />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="vehicle-grid">
            {vehicles.map((vehicle) => (
              <div key={vehicle._id} className="vehicle-card">
                <img
                  src={vehicle.images[0] || '/placeholder.jpg'}
                  alt={`${vehicle.brand} ${vehicle.model}`}
                />
                <h3>{vehicle.brand} {vehicle.model}</h3>
                <p>{vehicle.vehicleType}</p>
                <p className="price">
                  ₹{vehicle.exShowroomPrice.toLocaleString('en-IN')} (Ex-showroom)
                </p>
                <a href={`/vehicle/${vehicle._id}`}>View Details</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;