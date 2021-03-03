const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    // Not in this case
    case "You dont have quentity id":
      res.status(400).json({
        error: err.name,
      });

      break;
    default:
      console.log(err.name);
      res.status(500).json({
        error: "Internal Server Error",
      });
  }
};

module.exports = errorHandler;
