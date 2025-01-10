import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';

function Registration() {
  const navigate = useNavigate();
  
  const handleRoleSelect = (role) => {
    if (role === 'performer') {
      navigate('/performer/profile');
    } else {
      navigate('/producer/profile');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Выберите вашу роль
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Исполнитель
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Создайте портфолио и находите интересные проекты
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={() => handleRoleSelect('performer')}
            >
              Продолжить как исполнитель
            </Button>
          </CardActions>
        </Card>

        <Card sx={{ flex: 1 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Продюсер
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Публикуйте проекты и находите талантливых исполнителей
            </Typography>
          </CardContent>
          <CardActions>
            <Button 
              fullWidth 
              variant="contained" 
              onClick={() => handleRoleSelect('producer')}
            >
              Продолжить как продюсер
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
}

export default Registration;
