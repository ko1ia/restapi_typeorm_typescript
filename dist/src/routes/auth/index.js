"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../../controllers");
const controller = new controllers_1.AuthController();
const router = (0, express_1.Router)();
exports.authRouter = router;
router.post('/registration', async (req, res, next) => {
    await controller.registration(req, res, next);
});
