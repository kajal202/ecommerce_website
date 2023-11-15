const User = require("../models/UserModel");

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send("UnAuthorized Access");
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send("Error in admin middelware");
  }
};

module.exports = isAdmin;
