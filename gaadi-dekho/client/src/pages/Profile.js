import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

function Profile() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [savedSearches, setSavedSearches] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [filters, setFilters] = useState({});

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/users/favorites', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setFavorites(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      const fetchSavedSearches = async () => {
        try {
          const res = await axios.get('http://localhost:5000/api/users/saved-searches', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          setSavedSearches(res.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchFavorites();
      fetchSavedSearches();
    }
  }, [user]);

  const handleSaveSearch = async () => {
    try {
      await axios.post(
        'http://localhost:5000/api/users/save-search',
        { name: searchName, filters },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setSearchName('');
      setFilters({});
      const res = await axios.get('http://localhost:5000/api/users/saved-searches', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSavedSearches(res.data);
    } catch (error) {
      console.error(error);
      alert('Failed to save search');
    }
  };

  const handleDeleteSearch = async (searchId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/saved-searches/${searchId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setSavedSearches(savedSearches.filter((s) => s._id !== searchId));
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return <div>Please login to view your profile</div>;

  return (
    <div className="container profile">
      <h1>Profile</h1>
      <div className="profile-grid">
        <div className="section">
          <h2>Favorite Vehicles</h2>
          {favorites.length === 0 ? (
            <p>No favorites yet</p>
          ) : (
            <div>
              {favorites.map((vehicle) => (
                <div key={vehicle._id} className="item">
                  <h3>{vehicle.brand} {vehicle.model}</h3>
                  <p>₹{vehicle.exShowroomPrice.toLocaleString('en-IN')}</p>
                  <a href={`/vehicle/${vehicle._id}`}>View Details</a>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="section">
          <h2>Saved Searches</h2>
          <div>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search Name"
            />
            <button onClick={handleSaveSearch}>Save Current Search</button>
          </div>
          {savedSearches.length === 0 ? (
            <p>No saved searches</p>
          ) : (
            <div>
              {savedSearches.map((search) => (
                <div key={search._id} className="item">
                  <h3>{search.name}</h3>
                  <pre>{JSON.stringify(search.filters, null, 2)}</pre>
                  <button onClick={() => handleDeleteSearch(search._id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;