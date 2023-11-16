"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
const productControllers_1 = require("../controllers/productControllers");
router
    .route("/")
    .post([middlewares_1.authenticationMiddleware, (0, middlewares_1.authorizePermissions)("admin")], productControllers_1.createProduct)
    .get(productControllers_1.getAllProducts);
router
    .route("/uploadImage")
    .post([middlewares_1.authenticationMiddleware, (0, middlewares_1.authorizePermissions)("admin")], productControllers_1.uploadImage);
router
    .route("/:id")
    .get(productControllers_1.getSingleProduct)
    .patch([middlewares_1.authenticationMiddleware, (0, middlewares_1.authorizePermissions)("admin")], productControllers_1.updateProduct)
    .delete([middlewares_1.authenticationMiddleware, (0, middlewares_1.authorizePermissions)("admin")], productControllers_1.deleteProduct);
exports.default = router;
