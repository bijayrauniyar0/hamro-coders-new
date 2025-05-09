import express from 'express';
import multer from 'multer';
import {
  createTestimonial,
  getTestimonials,
} from '../controllers/testimonialsController';

const testimonialRouter = express.Router();

// Set up multer to handle file uploads (store in memory for now)
const upload = multer({
  dest: '/',
  limits: { fileSize: 1024 * 1024 },
});

// POST /testimonial — with image upload field named "profile-photo"
testimonialRouter.post('/', upload.single('profile_photo'), createTestimonial);
testimonialRouter.get('/', getTestimonials);

export default testimonialRouter;
