const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../Models/user");

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists, you can login",
        success: false,
      });
    }

    // Create a new user instance and hash the password
    
    const userModel = new UserModel({ name, email, password });
     userModel.password = await bcrypt.hash(password, 10);

    // Save the user to the database
    await userModel.save();

    // Respond with a success message
    res.status(201).json({
      message: "Signup successful",
      success: true,
    });
  } catch (err) {
    //console.error("Signup Error:", err); // Log the error for debugging
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const AuthMessage = "Auth failed email or password is incrrect ";
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        AuthMessage,
        success: false,
      });
    }

    // Create a new user instance and hash the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
        return res.status(403).json({
            AuthMessage,
            success: false,
          });
    }
    const jwtToken = jwt.sign({email:user.email, _id:user._id},
      process.env.JWT_SECRET,{expiresIn:"24h"});

    // Respond with a success message
    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken ,
      email,
      name:user.name,
    });
  } catch (err) {
    //console.error("Signup Error:", err); // Log the error for debugging
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
    signup,
    login 
};

