import { z } from 'zod';

import { tempEmailDomains } from '@Constants/Authentication';

export const emailSchema = z
  .string()
  .email({ message: 'Invalid email address' })
  .refine(
    email => {
      const domain = email.split('@')[1]?.toLowerCase();
      return domain && !tempEmailDomains.includes(domain);
    },
    {
      message: 'Temporary email addresses are not allowed',
    },
  );

export const dropdownValidation = (fieldName: string) =>
  z
    .union([
      z
        .string()
        .trim()
        .min(1, { message: `${fieldName} is required` }),
      z.number(),
      z.null(),
    ])
    .refine(value => value !== null && value !== '', {
      message: `${fieldName} is required`,
    });
