"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const services_1 = require("../../models/services");
class AuthController {
    constructor() {
        this._userService = new services_1.UserService();
    }
    async registration(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await this._userService.registration({ email, password });
            res.cookie('refreshCookie', userData.refreshToken, { maxAge: 2592000000, httpOnly: true });
            res.json(userData);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.AuthController = AuthController;
