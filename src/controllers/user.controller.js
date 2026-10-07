// We will import our service file here in the next step:
import * as userService from '../services/user.service.js';

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Call the application engine
    const newUser = await userService.createUser({ username, email, password });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};
