const requestTime = (req, res, next) => {
  req.requestTime = new Date().toISOString()

  console.log(req.requestTime)
  next();
};

export default requestTime;
