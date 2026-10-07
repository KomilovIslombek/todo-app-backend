import User from '../models/user.model.js';

// Search the database for an existing user record using an email filter
export const findByEmail = async email => {
  return await User.findOne({ email });
};

// Handle the database insertion operation and return the fresh database document
export const save = async userDocument => {
  const newUser = new User(userDocument);
  return await newUser.save();
};
