import { User } from '../models/allModels.js';
import bcrypt from 'bcrypt';

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create new user 
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  //check if user exists
  const userExists = await User.findOne({ email: email });

  try {
    if (userExists !== null) {
      res.status(400).json({ message: 'A user already exists with that email, please login, or use a different email' });
    } else {
      //hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPwd = await bcrypt.hash(password, salt);
      console.log(req.body);

      //create new user
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPwd,
      });
      await newUser.save();
      console.log(newUser);
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    try {
      if (await bcrypt.compare(password, userExists.password)) {
        res.send(`Hey ${userExists.name}!, Welcom back!`)
      } else {
        res.send({ message: 'wrong password' })
      }
    } catch (error) {
      res.status(500).send({ message: error.message })
    }
  } else {
    res.status(404).send({ message: 'User not found' })
  }
}
const userControllers = { registerUser, getUsers, loginUser };
export default userControllers;