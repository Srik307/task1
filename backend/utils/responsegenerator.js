function responseGenerator(res,statusCode, message, data) {
  return res.json({
    statusCode,
    message,
    data,
  });
}


module.exports={
    resgen:responseGenerator
}