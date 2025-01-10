import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function ProjectsList() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'Музыкальный клип',
      description: 'Требуется оператор и монтажер для съемки музыкального клипа',
      budget: '100000',
      deadline: '2024-02-01',
    },
    // Добавьте больше проектов при необходимости
  ]);

  const [open, setOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    budget: '',
    deadline: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    setProjects(prev => [...prev, { ...newProject, id: prev.length + 1 }]);
    setOpen(false);
    setNewProject({
      title: '',
      description: '',
      budget: '',
      deadline: '',
    });
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Проекты
      </Typography>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {project.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                  Бюджет: {project.budget} ₽
                </Typography>
                <Typography variant="body2">
                  {project.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Дедлайн: {project.deadline}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }}>
                  Откликнуться
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Создать новый проект</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Название проекта"
            type="text"
            fullWidth
            variant="outlined"
            value={newProject.title}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Описание"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newProject.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="budget"
            label="Бюджет"
            type="number"
            fullWidth
            variant="outlined"
            value={newProject.budget}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="deadline"
            label="Дедлайн"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            value={newProject.deadline}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={handleSubmit}>Создать</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ProjectsList;
