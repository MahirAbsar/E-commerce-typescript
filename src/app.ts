import "dotenv/config";
import "express-async-errors";
import morgan from "morgan";
import express, { Express, Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middlewares";
import { connectDB } from "./db/connect";

const app: Express = express();

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
// Routes
app.use("/api/v1/auth", authRouter);
app.get("/", (req: Request, res: Response) => {
  return res.send("<h1>E-Commerce App</h1>");
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URI!);
    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
