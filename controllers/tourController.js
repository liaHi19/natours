const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`This is id ${val}`);
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'fail', message: 'Incorrect ID' });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res
      .status(400)
      .json({ status: 'fail', message: 'Field name or price is absent' });
  }
  next();
};

exports.getTours = (req, res) => {
  const { requestTime } = req;
  res.status(200).json({
    status: 'success',
    results: tours.length,
    requestTime,
    data: { tours },
  });
};

exports.createTour = (req, res) => {
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

exports.getTour = (req, res) => {
  const id = +req.params.id;
  const tour = tours.find((tour) => tour.id === id);

  res.status(200).json({ status: 'success', data: { tour } });
};

exports.updateTour = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not defined' });
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;
  const newTours = tours.filter((el) => el.id !== id);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (err) => {
      res.status(204).json({ status: 'success', data: null });
    }
  );
};
