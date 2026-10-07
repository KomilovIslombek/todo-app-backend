import bcrypt from 'bcrypt';
import { ConflictError } from '../errors/AppError.js';

import * as userRepository from '../repositories/user.repository.js';

export const createUser = async userData => {
  const existingUser = await userRepository.findByEmail(userData.email);
  if (existingUser) {
    throw new ConflictError('A user with this email address already exists.');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  // 3. Write your data to your collection
  const savedUser = await userRepository.save({
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
  });

  // 4. Sanitation: Strip the password field out before returning it up
  const userObj = savedUser.toObject();
  const { password, ...safeUserOutput } = userObj;
  return safeUserOutput;
};
