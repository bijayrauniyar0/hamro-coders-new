import { Request, Response } from 'express';
import { getImageUrl, uploadFileToDrive } from '../services/driveService';
import Testimonial from '../models/testimonialsModel';

export const createTestimonial = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { file } = req;
    const { full_name, email, testimonial_text, exam_type, rating } = req.body;

    if (!file) {
      res.status(400).json({ message: 'No file uploaded' });
      return;
    }
    try {
      const fileResponse = await uploadFileToDrive(
        file,
        `${file.originalname}-${Date.now()}-${email}`,
      );
      res.status(200).json({
        message: 'Image uploaded successfully',
        fileResponse,
      });
      if (!fileResponse) {
        res.status(500).json({ message: 'Failed to upload image' });
        return;
      }
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload image', error });
      return;
    }

    // 3. Save testimonial to database with image URL

    const testimonial = await Testimonial.create({
      full_name,
      email,
      testimonial_text,
      exam_type,
      rating,
      // profile_photo: fileUrl,
    });

    if (!testimonial) {
      res.status(500).json({ message: 'Failed to create testimonial' });
    }
    res.status(201).json({
      message: 'Testimonial created successfully',
      testimonial,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getTestimonials = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const testimonials = await Testimonial.findAll();
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

        // Retrieve the URL for the image
        const imageUrl = await getImageUrl(fileId);

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
