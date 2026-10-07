// We will import our service file here in the next step:
// import * as userService from '../services/user.service.js';

export const registerUser = async (req, res, next) => {
  try {
    // 1. Extract the clean data passed through our validation shield
    // , password
    const { username, email } = req.body;

    // 2. Delegate work to the Service layer (using mock output for now)
    const mockNewUser = {
      id: 'usr_9823412',
      username,
      email,
      createdAt: new Date().toISOString(),
    };

    // 3. Return the response with the correct RESTful HTTP status code (201 Created)
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: mockNewUser,
    });
  } catch (error) {
    next(error);
  }
};
