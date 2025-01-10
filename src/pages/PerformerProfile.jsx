import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function PerformerProfile() {
  const [profile, setProfile] = useState({
    name: '',
    specialization: '',
    experience: '',
    description: '',
    portfolio: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    // В реальном приложении здесь будет загрузка файлов на сервер
    setProfile(prev => ({
      ...prev,
      portfolio: [...prev.portfolio, ...files]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь будет отправка данных на сервер
    console.log('Profile data:', profile);
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

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                Сохранить профиль
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default PerformerProfile;
