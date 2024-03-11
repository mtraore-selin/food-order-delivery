import express, { Application } from "express";
import path from "path";

import { AdminRoute, VandorRoute } from "../routes";
import { errorHandler, validationErrorHandler } from "../middlewares";

export default async (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/images", express.static(path.join(__dirname, "images")));

  app.use("/admin", AdminRoute);
  app.use("/vandor", VandorRoute);

  // Middleware pour capturer les 404
  app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
  });

  // Middleware d'erreur doit être le dernier middleware utilisé
  app.use(validationErrorHandler);
  app.use(errorHandler);

  return app;
};
