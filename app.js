require('./console');

const express = require('express');
const mainRouter = require('./routes/mainRoutes');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();

const port = 3000;

app.use(express.static('./public'));
app.use(express.json());

app.use('/api/v1', mainRouter);
app.use(notFound);
app.use(errorHandler);

const start = () => {
  app.listen(port, console.log(`Server running on Port: ${port}`));
};

start();
