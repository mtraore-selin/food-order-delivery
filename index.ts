import express from "express";

import connectDatabase from "./services/Database";
import App from "./services/ExpressApp";

const StartServer = async () => {
  const app = express();

  await connectDatabase();

  await App(app);

  app.listen(8000, () => console.log("Server runing on port 8000"));
};

StartServer();
