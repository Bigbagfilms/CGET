import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { WebApp } from '@vkruglikov/react-telegram-web-app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Box,
} from '@mui/material';
import {
  Person as PersonIcon,
  Work as WorkIcon,
  Group as GroupIcon,
} from '@mui/icons-material';

// Pages
import Registration from './pages/Registration';
import PerformerProfile from './pages/PerformerProfile';
import ProducerProfile from './pages/ProducerProfile';
import ProjectsList from './pages/ProjectsList';
import PerformersList from './pages/PerformersList';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0088cc',
    },
  },
});

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState('/');
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    setValue(location.pathname);
  }, [location]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    navigate(newValue);
  };

  if (location.pathname === '/') return null;

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Профиль"
          value={userRole === 'performer' ? '/performer/profile' : '/producer/profile'}
          icon={<PersonIcon />}
        />
        <BottomNavigationAction
          label="Проекты"
          value="/projects"
          icon={<WorkIcon />}
        />
        <BottomNavigationAction
          label="Исполнители"
          value="/performers"
          icon={<GroupIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box pb={7}> {/* Добавляем отступ снизу для навигационной панели */}
          <Routes>
            <Route path="/" element={<Registration />} />
            <Route path="/performer/profile" element={<PerformerProfile />} />
            <Route path="/producer/profile" element={<ProducerProfile />} />
            <Route path="/projects" element={<ProjectsList />} />
            <Route path="/performers" element={<PerformersList />} />
          </Routes>
          <NavigationBar />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
