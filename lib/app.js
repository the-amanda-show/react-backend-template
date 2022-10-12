const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors');

// Built in middleware
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  next();
});
app.use(
  cors({
    origin: [
      'http://localhost:7892',
      'https://inquisitive-melomakarona-1dfb4f.netlify.app',
      '*',
    ],
    credentials: true,
  })
);

// App routes
app.use('/api/v1/users', require('./controllers/users'));
app.use('/api/v1/todos', require('./controllers/todos'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
