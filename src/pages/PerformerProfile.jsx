import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
  Snackbar,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { WebApp } from '@vkruglikov/react-telegram-web-app';

function PerformerProfile() {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    specialization: '',
    experience: '',
    description: '',
    portfolio: []
  });

  useEffect(() => {
    // Загружаем сохраненные данные
    const savedProfile = localStorage.getItem('performerProfile');
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

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setProfile(prev => ({
      ...prev,
      portfolio: [...prev.portfolio, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    try {
      // Сохраняем в localStorage
      localStorage.setItem('performerProfile', JSON.stringify(profile));
      
      // Отправляем данные через Telegram WebApp
      WebApp.sendData(JSON.stringify({
        type: 'performer_profile',
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
          Профиль исполнителя
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
                label="Специализация"
                name="specialization"
                value={profile.specialization}
                onChange={handleInputChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Опыт работы"
                name="experience"
                value={profile.experience}
                onChange={handleInputChange}
                multiline
                rows={3}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="О себе"
                name="description"
                value={profile.description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Портфолио
              </Typography>
              <Button
                variant="contained"
                component="label"
                startIcon={<PhotoCamera />}
              >
                Загрузить файлы
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                />
              </Button>
              
              {profile.portfolio.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    Загружено файлов: {profile.portfolio.length}
                  </Typography>
                </Box>
              )}
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

export default PerformerProfile;
