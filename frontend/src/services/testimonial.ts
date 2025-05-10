import { api } from '.';

export const createTestimonial = (payload: Record<string, any>) => {
  return api.post('/api/testimonial', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getTestimonials = (params: Record<string, any>) => {
  return api.get('/api/testimonial/', { params });
};
