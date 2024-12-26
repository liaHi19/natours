const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('uncaughtException 🔥 Shutting down!');
  console.log(err.name, err.message);
  process.exit(1);
});
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database is connected'));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Port is running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection 🔥 Shutting down!');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// console.log(x);
