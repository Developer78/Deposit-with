const jwt = require("jsonwebtoken");
const process = require('../utils/process');

const getTokenFromHeader = (req) => {
  const {
    headers: {authorization}
  } = req;
  if(authorization && authorization.split(' ')[0] === "Bearer"){
    return authorization.split(' ')[1];
  }
  return null;
}
verifyToken = (req, res, next) => {
  let token = getTokenFromHeader(req);

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, process.env_production.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const authJwt = {
  verifyToken,
};

module.exports = authJwt;