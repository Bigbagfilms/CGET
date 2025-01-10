import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Инициализация Telegram WebApp
window.Telegram.WebApp.ready();

// Установка основного цвета темы
window.Telegram.WebApp.setHeaderColor('#0088cc');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
