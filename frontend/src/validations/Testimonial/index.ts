import { z } from 'zod';

import { dropdownValidation, emailSchema } from '..';

export const testimonialSchema = z.object({
  full_name: z.string().min(3, 'Full Name is Required'),
  email: emailSchema,
  exam_type: dropdownValidation('Exam Type'),
  rating: z
    .number({
      required_error: 'Rating is required',
      invalid_type_error: 'Rating must be a number',
    })
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating cannot be more than 5'),
  testimonial: z
    .string()
    .min(1, 'Testimonial must be at least 10 characters')
    .max(300, 'Testimonial cannot be more than 300 characters'),
});

export type TestimonialFormSchema = z.infer<typeof testimonialSchema>;
