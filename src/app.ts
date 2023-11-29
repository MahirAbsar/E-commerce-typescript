import "dotenv/config";
import "express-async-errors";
import morgan from "morgan";
import express, { Express, Request, Response } from "express";
import authRouter from "./routes/authRoutes";
import userRouter from "./routes/userRoutes";
import productRouter from "./routes/productRoutes";
import orderRouter from "./routes/orderRoutes";
import reviewRouter from "./routes/reviewRoutes";
import { notFoundMiddleware, errorHandlerMiddleware } from "./middlewares";
import { connectDB } from "./db/connect";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { rateLimit } from "express-rate-limit";
import { xss } from "express-xss-sanitizer";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";

const app: Express = express();

// security stuffs
app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(limiter);
app.use(helmet());
app.use(xss());
app.use(cors());
app.use(mongoSanitize());
// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use(fileUpload());
// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders", orderRouter);
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
