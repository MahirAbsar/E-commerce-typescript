"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const userControllers_1 = require("../controllers/userControllers");
const router = express_1.default.Router();
router
    .route("/")
    .get(middlewares_1.authenticationMiddleware, (0, middlewares_1.authorizePermissions)("admin", "owner"), userControllers_1.getAllUsers);
router.route("/showMe").get(middlewares_1.authenticationMiddleware, userControllers_1.showCurrentUser);
router.route("/updateUser").patch(userControllers_1.updateUser);
router.route("/updateUserPassword").patch(middlewares_1.authenticationMiddleware, userControllers_1.updateUserPassword);
router
    .route("/:id")
    .get(middlewares_1.authenticationMiddleware, (0, middlewares_1.authorizePermissions)("admin", "user"), userControllers_1.getSingleUser);
exports.default = router;
