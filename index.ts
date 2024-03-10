import express from "express";

import { AdminRoute, VandorRoute } from "./routes";
import { connectDatabase } from "./config/database";
import { errorHandler, validationErrorHandler } from "./middlewares";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/admin", AdminRoute);
app.use("/vandor", VandorRoute);

connectDatabase();

// Middleware pour capturer les 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Middleware d'erreur doit être le dernier middleware utilisé
app.use(errorHandler);
app.use(validationErrorHandler);

app.listen(8000, () => console.log("Server runing on port 8000"));
