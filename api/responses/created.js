// api/responses/created.js

module.exports = function created(data) {
  // Get access to `req` and `res`
  const res = this.res;

  // Set the status code to 201
  res.status(201);

  // Send the data (if provided)
  if (data !== undefined) {
    return res.json(data);
  }

  // If no data is provided, just send the status
  return res.sendStatus(201);
};
