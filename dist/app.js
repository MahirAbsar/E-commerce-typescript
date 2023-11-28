"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const middlewares_1 = require("./middlewares");
const connect_1 = require("./db/connect");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, morgan_1.default)("tiny"));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
app.use(express_1.default.static("./public"));
app.use((0, express_fileupload_1.default)());
// Routes
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/users", userRoutes_1.default);
app.use("/api/v1/products", productRoutes_1.default);
app.use("/api/v1/reviews", reviewRoutes_1.default);
app.use("/api/v1/orders", orderRoutes_1.default);
app.get("/", (req, res) => {
    return res.send("<h1>E-Commerce App</h1>");
});
app.use(middlewares_1.notFoundMiddleware);
app.use(middlewares_1.errorHandlerMiddleware);
const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        await (0, connect_1.connectDB)(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
