import { z } from 'zod';

export const createTodoSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'title is required' })
      .min(3, 'title must be at least 3 characters long'),
  }),
});
