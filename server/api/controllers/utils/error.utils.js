const createCustomError = (message, statusCode, type) => {
  const err = new Error({ message, statusCode, type: "customError:" + type });
  return err;
};

module.exports = { createCustomError };
