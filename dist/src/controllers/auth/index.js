"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const User_1 = require("../../models/entity/User");
const data_access_1 = require("../../data-access");
const auth_1 = require("../enums/auth");
const bcryptjs_1 = require("bcryptjs");
class AuthController {
    constructor() {
        this._repository = data_access_1.DataBase.getRepository(User_1.User);
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const hashPassword = (0, bcryptjs_1.hashSync)(password);
            const user = this._repository.create({ email, password: hashPassword, token: 'kek' });
            const result = yield this._repository.save(user);
            res.json(result);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield this._repository.findOneBy({ email });
            if (user) {
                const isValidPassword = (0, bcryptjs_1.compareSync)(password, user.password);
                if (isValidPassword) {
                    const accessToken = this._generateAccessToken(user);
                    const refreshToken = this._generateRefreshToken(user);
                    res.json({ accessToken, refreshToken });
                }
                else {
                    res.status(auth_1.StatusCode.BAD_REQUEST).json({ message: 'Пароли не совпадают' });
                }
            }
            else {
                res.status(auth_1.StatusCode.NOTFOUND).json({ message: 'Такого пользователя не сущевствует' });
            }
        });
    }
    _generateAccessToken(user) {
        return (0, jsonwebtoken_1.sign)(Object.assign({}, user), process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1200 });
    }
    _generateRefreshToken(user) {
        return (0, jsonwebtoken_1.sign)(Object.assign({}, user), process.env.REFRESH_TOKEN_SECRET);
    }
}
exports.AuthController = AuthController;
