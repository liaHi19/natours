const mongoose = require('mongoose');
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
app.listen(PORT, () => {
  console.log(`Port is running on port ${PORT}`);
});
