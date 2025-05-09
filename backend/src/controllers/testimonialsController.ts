import { Request, Response } from 'express';
import { uploadFileToDrive } from '../services/driveService';
import Testimonial from '../models/testimonialsModel';
import { BASE_URL } from '../constants';

export const createTestimonial = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { file } = req;
    const { full_name, email, testimonial, exam_type, rating } = req.body;

    try {
      let fileResponse = null;
      if (file) {
        fileResponse = await uploadFileToDrive(
          file,
          `${file.originalname}-${Date.now()}-${email}`,
        );
        if (!fileResponse) {
          res.status(500).json({ message: 'Failed to upload image' });
          return;
        }
      }
      const testimonialResponse = await Testimonial.create({
        full_name,
        email,
        testimonial,
        exam_type,
        rating,
        profile_photo: fileResponse?.id || null,
      });
      if (!testimonialResponse) {
        res.status(500).json({ message: 'Failed to create testimonial' });
      }
      res.status(201).json({
        message: 'Testimonial created successfully',
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload image', error });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getTestimonials = async (
  req: Request<unknown, unknown, unknown, { apiKey?: string }>,
  res: Response,
): Promise<void> => {
  try {
    const testimonials = await Testimonial.findAll({
      attributes: {
        exclude: ['email', 'created_at'],
      },
    });

    const testimonialsWithImageUrl = await Promise.all(
      testimonials.map(async testimonial => {
        const { profile_photo: fileId, ...restTestimonialData } =
          testimonial.toJSON();

        if (!fileId) {
          return {
            ...restTestimonialData,
            profile_photo: null,
          };
        }
        const imageUrl = `${BASE_URL}/api/private/image/${fileId}`;
        return {
          ...restTestimonialData,
          profile_photo: imageUrl, // Only the URL here, not the file stream
        };
      }),
    );

    res.status(200).json(testimonialsWithImageUrl);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
