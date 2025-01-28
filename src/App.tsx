// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import BottomNav from './components/BottomNav';
import { Box } from '@mui/material';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Box sx={{ paddingBottom: '56px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Box>
      <BottomNav />
    </Router>
  );
}

export default App;