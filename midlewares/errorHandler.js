const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    // Not in this case
    // case "Register User Failed":
    //   res.status(400).json({
    //     error: err.name,
    //   });

    //   break;
    // case "Login User Failed":
    //   res.status(400).json({
    //     error: err.name,
    //   });

    //   break;
    // case "Failed Create Product":
    //   res.status(400).json({
    //     error: err.name,
    //   });

    //   break;
    // case "Data Products Not Found":
    //   res.status(400).json({
    //     error: err.name,
    //   });

    //   break;
    default:
      console.log(err.name);
      res.status(500).json({
        error: "Internal Server Error",
      });
  }
};

module.exports = errorHandler;
