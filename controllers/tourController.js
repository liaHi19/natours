const Tour = require('./../models/tourModel');

exports.getTours = async (req, res) => {
  const queryObj = { ...req.query };

  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  const query = Tour.find(queryObj);

  const tours = await query;

  try {
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours },
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid data sent' });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({ status: 'success', data: { tour } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: 'Invalid data sent' });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: 'success', data: { tour } });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      message: `A tour with id: ${req.params.id} has been deleted successfully`,
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error });
  }
};
