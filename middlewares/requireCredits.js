module.exports = (request, response, next) => {
    if (request.user.credits < 1) {
      return response.status(403).send({ error: "You don't have enough credits!" });
    }
  
    next();
  };
  