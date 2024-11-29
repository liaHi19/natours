const Tour = require('./../models/tourModel');

exports.getTours = (req, res) => {
  const { requestTime } = req;
  // res.status(200).json({
  //   status: 'success',
  //   results: tours.length,
  //   requestTime,
  //   data: { tours },
  // });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid data sent' });
  }
};

exports.getTour = (req, res) => {
  const id = +req.params.id;
  // const tour = tours.find((tour) => tour.id === id);

  // res.status(200).json({ status: 'success', data: { tour } });
};

exports.updateTour = (req, res) => {
  res
    .status(500)
    .json({ status: 'error', message: 'This route is not defined' });
};

exports.deleteTour = (req, res) => {
  const id = +req.params.id;
};
