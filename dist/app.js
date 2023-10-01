"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("express-async-errors");
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const connect_1 = require("./db/connect");
const app = (0, express_1.default)();
// Middlewares
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
// Routes
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