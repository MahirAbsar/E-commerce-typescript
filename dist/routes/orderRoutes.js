"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const orderControllers_1 = require("../controllers/orderControllers");
const router = express_1.default.Router();
router
    .route("/")
    .post(middlewares_1.authenticationMiddleware, orderControllers_1.createOrder)
    .get(middlewares_1.authenticationMiddleware, (0, middlewares_1.authorizePermissions)("admin"), orderControllers_1.getAllOrders);
router
    .route("/showAllMyOrders")
    .get(middlewares_1.authenticationMiddleware, orderControllers_1.getCurrentUserOrders);
router
    .route("/:id")
    .get(middlewares_1.authenticationMiddleware, orderControllers_1.getSingleOrder)
    .patch(middlewares_1.authenticationMiddleware, orderControllers_1.updateOrder);
exports.default = router;
