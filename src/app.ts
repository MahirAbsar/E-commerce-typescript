import "dotenv/config";
import "express-async-errors";
import express, { Express, Request, Response } from "express";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middlewares";

const app: Express = express();

// Middlewares
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  return res.send("<h1>E-Commerce App</h1>");
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = (): void => {
  try {
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
