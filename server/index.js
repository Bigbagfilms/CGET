require('dotenv').config();
const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Инициализация бота
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

app.use(cors());
app.use(express.json());

// Обработка команды /start
bot.onText(/\/start/, async (msg) => {
  try {
    const chatId = msg.chat.id;
    console.log('Received /start command from chat ID:', chatId);
    
    const keyboard = {
      inline_keyboard: [
        [{
          text: 'Открыть приложение',
          web_app: { url: process.env.WEBAPP_URL }
        }]
      ]
    };

    await bot.sendMessage(chatId, 'Добро пожаловать! Нажмите кнопку ниже, чтобы открыть приложение:', {
      reply_markup: keyboard
    });
    console.log('Sent welcome message to chat ID:', chatId);
  } catch (error) {
    console.error('Error handling /start command:', error);
  }
});

// Обработка сообщений от веб-приложения
bot.on('message', async (msg) => {
  try {
    console.log('Received message:', msg);
    if (msg.web_app_data) {
      const data = JSON.parse(msg.web_app_data.data);
      console.log('Received data from web app:', data);
    }
  } catch (error) {
    console.error('Error handling message:', error);
  }
});

// Обработка ошибок бота
bot.on('error', (error) => {
  console.error('Bot error:', error);
});

bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});

// API эндпоинты
app.post('/api/send-message', async (req, res) => {
  try {
    const { chatId, text } = req.body;
    await bot.sendMessage(chatId, text);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Bot username:', bot.botName);
});
