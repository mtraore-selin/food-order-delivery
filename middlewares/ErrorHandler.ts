import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
}

// Middleware pour gérer les erreurs de validation MongoDB
export const validationErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError") {
    // Erreur de validation MongoDB
    const errorMessage = err.message || "Validation failed";
    const stackTrace = process.env.NODE_ENV === "production" ? "🥞" : err.stack;

    console.error("Validation error:", errorMessage);
    console.error("Stack trace:", stackTrace);

    res.status(400).json({
      message: errorMessage,
      stack: stackTrace,
    });
  } else {
    // Passe l'erreur à l'erreur suivante le middleware
    next(err);
  }
};

export const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  res.status(statusCode);

  res.json({
    message: err.message,
    // Stack trace only  dev mode
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};
