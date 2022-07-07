const notFoundError = (req, res) => {
  res.status(404).json({ error: 'not found' });
};

const serverError = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};

export { notFoundError, serverError };
