import { User } from '../models/allModels.js';

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json(newUser);
    res.send('User created successfully');
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};// create new user 

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
    res.send('Users retrieved successfully');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};// find a user in the db, will be used essentialy for identification 

const userControllers = { createUser, getUsers };
export default userControllers;