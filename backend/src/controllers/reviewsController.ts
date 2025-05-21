import { Request, Response } from 'express';
// import { uploadFileToDrive } from '../services/driveService';
import Review from '../models/reviewsModel';
import { BASE_URL } from '../constants';
// import { AzureBlobService } from '../services/azureBlobService';

export const createReview = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // const { file } = req;
    const { full_name, email, review, exam_type, rating } = req.body;

    try {
      // const fileResponse = null;
      // if (file) {
      //   const filePath = file.path;
      //   const blobName = `reviews/${Date.now()}-${file.originalname}`;
      //   const azureService = new AzureBlobService();
      //   await azureService.uploadProfilePic(filePath, blobName);
      // }
      const reviewResponse = await Review.create({
        full_name,
        email,
        review,
        exam_type,
        rating,
        // profile_photo: fileResponse?.id || null,
      });
      if (!reviewResponse) {
        res.status(500).json({ message: 'Failed to create review' });
      }
      res.status(201).json({
        message: 'Review created successfully',
      });
    } catch (error) {
      res.status(500).json({ message: 'Failed to upload image', error });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

export const getReviews = async (
  req: Request<unknown, unknown, unknown, { apiKey?: string }>,
  res: Response,
): Promise<void> => {
  try {
    const reviews = await Review.findAll({
      attributes: {
        exclude: ['email', 'created_at'],
      },
    });

    const reviewsWithImageUrl = await Promise.all(
      reviews.map(async review => {
        const { profile_photo: fileId, ...restReviewData } = review.toJSON();

        if (!fileId) {
          return {
            ...restReviewData,
            profile_photo: null,
          };
        }
        const imageUrl = `${BASE_URL}/api/private/image/${fileId}`;
        return {
          ...restReviewData,
          profile_photo: imageUrl, // Only the URL here, not the file stream
        };
      }),
    );

    res.status(200).json(reviewsWithImageUrl);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
