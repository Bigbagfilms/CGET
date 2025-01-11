import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Typography,
  Box,
  Paper,
  Grid,
  Snackbar,
} from '@mui/material';
import { WebApp } from '@vkruglikov/react-telegram-web-app';

function ProducerProfile() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    company: '',
    position: '',
    about: '',
  });

  useEffect(() => {
    // Загружаем сохраненные данные
    const savedProfile = localStorage.getItem('producerProfile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }

    // Настраиваем главную кнопку Telegram
    WebApp.MainButton.setText('Сохранить профиль');
    WebApp.MainButton.onClick(handleSubmit);
    WebApp.MainButton.show();

    return () => {
      WebApp.MainButton.offClick(handleSubmit);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      // Сохраняем в localStorage
      localStorage.setItem('producerProfile', JSON.stringify(profile));
      
      // Отправляем данные через Telegram WebApp
      WebApp.sendData(JSON.stringify({
        type: 'producer_profile',
        data: profile
      }));

      // Показываем уведомление
      setOpenSnackbar(true);
      
      // Закрываем WebApp после короткой задержки
      setTimeout(() => {
        WebApp.close();
      }, 1500);
    } catch (error) {
      console.error('Error saving profile:', error);
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Профиль продюсера
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Имя"
                name="name"
                value={profile.name}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Компания"
                name="company"
                value={profile.company}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Должность"
                name="position"
                value={profile.position}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="О себе/компании"
                name="about"
                value={profile.about}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Профиль успешно сохранен"
      />
    </Container>
  );
}

export default ProducerProfile;
