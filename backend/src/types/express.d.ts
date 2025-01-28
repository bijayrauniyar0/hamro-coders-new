/* eslint-disable no-unused-vars */
// src/types/express.d.ts
import 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Define a specific type instead of `any` if you know the structure
    }
  }
}

export {};