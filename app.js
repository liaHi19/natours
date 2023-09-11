const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Request handles
const getTours = (req, res) => {
  const { requestTime } = req;
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestTime,
    data: { tours },
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...req.body };
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    }
  );
};

const getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Incorrect ID' });
  }

  res.status(200).json({ status: 'success', data: { tour } });
};

const deleteTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Incorrect ID' });
  }
  const newTours = tours.filter((el) => el.id !== id);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (err) => {
      res.status(204).json({ status: 'success', data: null });
    }
  );
};

// Request routes
app.route('/api/v1/tours').get(getTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTour).delete(deleteTour);

// Port
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Port is running on port ${PORT}`);
});
