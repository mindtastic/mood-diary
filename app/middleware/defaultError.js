const notFoundError = (req, res) => {
  res.status(404).json({ error: 'not found' });
};

// Express recongizes the error handler by the number of arguments
// the function accepts, so `next` should be defined even if it is
// not used inside the handler. ESLint will complain about unused
// vars, we will disable it by no-unused-vars rule.
/* eslint-disable no-unused-vars */
const serverError = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};
/* eslint-enable no-unused-vars */

export { notFoundError, serverError };
