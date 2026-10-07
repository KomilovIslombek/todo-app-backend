import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    username: z
      .string({ required_error: 'Username is required' })
      .min(3, 'Username must be at least 3 characters long'),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address configuration'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long'),
  }),
});
