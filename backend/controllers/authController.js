import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupHandler = async (req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.status(400).json({message:"All fields are required"})
    }
    if(req.body.password.length < 6){
        return res.status(400).json({message:"Password must be at least 6 characters long"})
    }
   
    const user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({message:"User already exists krta hai , please login kriye "})
    }
  const { name, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hash });
  res.json({ message: "User Signed Up Successfully" });
};

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};
