import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getActiveRoute = () => {
    if (location.pathname === '/admin') return 1;
    return 0;
  };

  if (location.pathname === '/login') {
    return (
      <BottomNavigation
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, justifyContent: 'center' }}
        showLabels
        value={getActiveRoute()}
        onChange={(_event, newValue) => {
          if (newValue === 0) navigate('/');
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      </BottomNavigation>
    );
  }

  return (
    <BottomNavigation
      sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, justifyContent: 'center' }}
      showLabels
      value={getActiveRoute()}
      onChange={(_event, newValue) => {
        if (newValue === 0) navigate('/');
        if (newValue === 1) navigate('/admin');
      }}
    >
      {location.pathname !== '/' && (
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      )}
      <BottomNavigationAction label="Admin" icon={<AdminPanelSettingsIcon />} />
    </BottomNavigation>
  );
};

export default BottomNav;
