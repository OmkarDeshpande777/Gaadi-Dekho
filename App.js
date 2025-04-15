import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Updated import
import CssBaseline from '@mui/material/CssBaseline'; // Updated import
import Navbar from './components/Navbar.js'; // Updated from Header
import Footer from './components/Footer.js/index.js';
import Home from './pages/Home'; // Updated from HomePage
import VehicleDetails from './pages/VehicleDetails'; // Updated from VehicleDetailPage
import Login from './pages/Login'; // Updated from LoginPage
import Register from './pages/Register'; // Updated from RegisterPage
import Profile from './pages/Profile'; // Updated from ProfilePage
import { AuthProvider } from './context/AuthContext';

// Create a theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff5722', // Orange color
    },
    secondary: {
      main: '#2196f3', // Blue color
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Navbar /> {/* Updated from Header */}
          <main>
            <Routes>
              <Route path="/" element={<Home />} /> {/* Updated from HomePage */}
              <Route path="/vehicles" element={<Home />} /> {/* Reuse Home for vehicle list */}
              <Route path="/vehicle/:id" element={<VehicleDetails />} /> {/* Updated from VehicleDetailPage */}
              <Route path="/login" element={<Login />} /> {/* Updated from LoginPage */}
              <Route path="/register" element={<Register />} /> {/* Updated from RegisterPage */}
              <Route path="/profile" element={<Profile />} /> {/* Updated from ProfilePage */}
              <Route path="/favorites" element={<Profile />} /> {/* Reuse Profile for favorites */}
              <Route path="/saved-searches" element={<Profile />} /> {/* Reuse Profile for saved searches */}
            </Routes>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;