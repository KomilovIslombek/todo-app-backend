import bcrypt from 'bcrypt';
import { ConflictError } from '../errors/AppError.js';

// Temporary mock repository layer to simulate database lookups
const mockUserRepository = {
  findByEmail: async email => {
    if (email === 'taken@example.com') {
      return { id: 'usr_1', email: 'taken@example.com' };
    }
    return null;
  },
  save: async userData => {
    return {
      id: `usr_${Math.random().toString(36).substr(2, 9)}`,
      ...userData,
      createdAt: new Date().toISOString(),
    };
  },
};

export const createUser = async userData => {
  // 1. Business Rule Check: Check if email is already taken
  const existingUser = await mockUserRepository.findByEmail(userData.email);
  if (existingUser) {
    throw new ConflictError('A user with this email address already exists.');
  }

  // 2. Heavy Lifting: Hash the user's password securely
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

  // 3. Delegate to Data Access Layer to persist user record
  const savedUser = await mockUserRepository.save({
    username: userData.username,
    email: userData.email,
    password: hashedPassword,
  });

  // 4. Sanitation: Strip the password field out before returning it up
  const { password, ...safeUserOutput } = savedUser;
  return safeUserOutput;
};
