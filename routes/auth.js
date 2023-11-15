const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const authenticate = require("../middleware/authenticate");
// const OrderModel = require("../models/OrderModel");

router.post("/register", async (req, res) => {
  const { name, email, phone, password, address } = req.body;

  if (name && email && phone && password && address) {
    const newUser = new User({ name, email, phone, password, address });
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ error: "user is already registered" });
    }
    const userRegistered = newUser.save();

    if (userRegistered) {
      return res.json({ success: "user registered successfully" });
    } else {
      return res
        .status(500)
        .json({ error: "Opps some error occured while trying to registered" });
    }
  } else {
    res.status(406).json({ error: "please fill all the required fields" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const userFound = await User.findOne({ email: email });

    if (userFound) {
      const passwordMatch = await bcrypt.compare(password, userFound.password);
      const token = await userFound.generateAuthToken();
      res.cookie("jsonwebToken", token, {
        expires: new Date(Date.now() + 86500000),
        httpOnly: true,
      });
      if (passwordMatch) {
        res.json({
          message: "login successful",
          userFound,
        });
      } else {
        res
          .status(401)
          .json({ message: "login failed. Incorrect credentials" });
      }
    } else {
      res.status(481).json({ message: "invalid credential" });
    }
  } else {
    res.status(486).json({ message: "please fill all the fields correctly" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jsonwebToken");
  res.send({ success: true, message: "User logged Out Successfully" });
});

router.get("/profile-data", authenticate,  (req, res)=>{
  res.send(req.user);
});

router.get("/Learn", authenticate, (req, res) => {
  // console.log('After', req.user);
  res.send(req.user);
  //console.log({message : "hello"});
});

router.put("/profile", authenticate, async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;
    const user = await User.findById(req.user._id);
    if (password && password.length < 4) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        phone: phone || user.phone,
        password: password || user.password,
        email: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
});

module.exports = router;
