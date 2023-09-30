"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("./middlewares");
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.get("/", (req, res) => {
    return res.send("<h1>E-Commerce App</h1>");
});
app.use(middlewares_1.notFoundMiddleware);
app.use(middlewares_1.errorHandlerMiddleware);
const PORT = process.env.PORT || 3000;
const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
    }
    catch (error) {
        console.log(error);
    }
};
start();
