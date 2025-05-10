import { z } from 'zod';

import { emailSchema } from '..';

export const signupSchemaStepOne = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .regex(/^[a-zA-Z0-9\s]+$/, {
      message: 'Only letters, numbers, and spaces are allowed',
    }),
  email: emailSchema,
  number: z
    .string()
    .optional()
    .refine(val => !val || /^[0-9]+$/.test(val), {
      message: 'Number must contain only digits',
    }),
});

export const passwordValidation = z
  .object({
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z
      .string()
      .min(6, 'Confirm Password must be at least 6 characters long'),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'], // Focus error on `confirmPassword` field
    message: 'Passwords do not match',
  });
