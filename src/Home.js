import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Home.css';

// Fix icon issues in leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

const MapClickHandler = ({ setMarkers }) => {
  useMapEvents({
    click: (event) => {
      const { lat, lng } = event.latlng;
      setMarkers((prevMarkers) => [...prevMarkers, { id: Date.now(), position: [lat, lng] }]);
    },
  });
  return null;
};



const Home = () => {
  const [user, setUser] = useState({ name: 'User', email: '' });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [markers, setMarkers] = useState([]); // Pastikan markers diinisialisasi sebagai array kosong
  
  const navigate = useNavigate();

  // Lokasi yang sudah ada
  // const locations = [
  //   { id: 1, name: 'Lokasi 1', desc: 'Nongki', position: [-6.200000, 106.816666] },
  //   { id: 2, name: 'Lokasi 2', desc: 'Nongki', position: [-6.210000, 106.845000] },
  //   { id: 3, name: 'Lokasi 3', desc: 'Nongki', position: [-6.175000, 106.827000] },
  //   { id: 4, name: 'lokasi 4', desc: 'kampus', position: [-8.674329630540246, 115.20272043198977]},
  //   { id: 5, name: 'lokasi 5', desc: 'rumah Bayu', position: [-9.675939, 149.013217]}
  // ];

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/');
      return;
    }

    // Ambil data user
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    if (userData.name) {
      setUser(userData);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const handleLocationSelect = (location) => {
  //   setSelectedLocation(location);
  //   setIsMenuOpen(false);
  // };

  // const handleMapClick = (event) => {
  //   const { lat, lng } = event.latlng; // Mendapatkan koordinat klik
  //   setMarker({ position: [lat, lng] }); // Menyimpan marker terbaru
  //   setSelectedMarker({ position: [lat, lng] });
  // };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>SIG Website</h2>
          <div className="user-info">
            <div className="avatar">{user.name.charAt(0)}</div>
            <div className="user-details">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="sidebar-menu">
          <div className="menu-item active">
            <i className="icon">🏠</i>
            <span>Dashboard</span>
          </div>
          <div className="menu-item">
            <i className="icon">📌</i>
            <span>Lokasi</span>
          </div>
          <div className="menu-item">
            <i className="icon">📊</i>
            <span>Analisis</span>
          </div>
          <div className="menu-item">
            <i className="icon">⚙</i>
            <span>Pengaturan</span>
          </div>
        </div>
        
        <div className="logout-button" onClick={handleLogout}>
          <i className="icon">↙️</i>
          <span>Logout</span>
        </div>
      </div>
      
      <div className="main-content">
        <div className="header">
          <div className="menu-toggle" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1>Peta Dunia</h1>
        </div>
        
        <div className="content">
          <div className="map-container">
            <MapContainer center={[-6.200000, 106.816666]} zoom={12} style={{ height: '100%', width: '100%' }} >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* Menambahkan marker yang sudah ada di `locations` */}
              <MapClickHandler setMarkers={setMarkers} />
              {markers.map((marker) => (
                <Marker key={marker.id} position={marker.position}>
                  <Popup>
                    <div>
                      <h3>Koordinat</h3>
                      <p>Lat: {marker.position[0]}, Lng: {marker.position[1]}</p>
                    </div>
                  </Popup>
                </Marker> 
              ))}
            </MapContainer>
          </div>
          
          {/* <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <div className="menu-header">
              <h3>Daftar Lokasi</h3>
              <button className="close-button" onClick={toggleMenu}>✕</button>
            </div>
            <div className="location-list">
              {locations.map(location => (
                <div 
                  key={location.id} 
                  className={`location-item ${selectedLocation?.id === location.id ? 'active' : ''}`}
                  onClick={() => handleLocationSelect(location)}
                >
                  <h4>{location.name}</h4>
                  <p>{location.desc}</p>
                </div>
              ))}
            </div>
          </div> */}
{/*           
          {selectedLocation && (
            <div className="info-panel">
              <h3>{selectedLocation.name}</h3>
              <p>{selectedLocation.desc}</p>
              <div className="info-actions">
                <button className="info-button">Detail</button>
                <button className="info-button secondary">Rute</button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Home;
