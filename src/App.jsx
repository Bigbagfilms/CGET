import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WebApp } from '@vkruglikov/react-telegram-web-app';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/performer/profile" element={<PerformerProfile />} />
          <Route path="/producer/profile" element={<ProducerProfile />} />
          <Route path="/projects" element={<ProjectsList />} />
          <Route path="/performers" element={<PerformersList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
