import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  TextField,
  Box,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';

function PerformersList() {
  const [performers, setPerformers] = useState([
    {
      id: 1,
      name: 'Александр Иванов',
      specialization: 'Оператор',
      experience: '5 лет опыта в съемке музыкальных клипов',
      portfolio: ['project1.jpg', 'project2.jpg'],
    },
    // Добавьте больше исполнителей при необходимости
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPerformer, setSelectedPerformer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenPortfolio = (performer) => {
    setSelectedPerformer(performer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const filteredPerformers = performers.filter(performer =>
    performer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    performer.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Исполнители
      </Typography>

      <TextField
        fullWidth
        label="Поиск по имени или специализации"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        sx={{ mb: 3 }}
      />

      <Grid container spacing={3}>
        {filteredPerformers.map((performer) => (
          <Grid item xs={12} key={performer.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar sx={{ width: 56, height: 56, mr: 2 }}>
                    {performer.name[0]}
                  </Avatar>
                  <Box>
                    <Typography variant="h6">
                      {performer.name}
                    </Typography>
                    <Chip 
                      label={performer.specialization}
                      color="primary"
                      size="small"
                    />
                  </Box>
                </Box>
                
                <Typography variant="body2" color="text.secondary">
                  {performer.experience}
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => handleOpenPortfolio(performer)}
                  >
                    Посмотреть портфолио
                  </Button>
                  <Button 
                    variant="contained" 
                    sx={{ ml: 1 }}
                  >
                    Связаться
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          Портфолио {selectedPerformer?.name}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {selectedPerformer?.portfolio.map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <img
                  src={item}
                  alt={`Portfolio item ${index + 1}`}
                  style={{ width: '100%', height: 'auto' }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

export default PerformersList;
