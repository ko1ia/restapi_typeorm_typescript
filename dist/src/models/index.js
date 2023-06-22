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
const data_access_1 = require("../data-access");
const User_1 = require("./entity/User");
data_access_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.User();
    user.login = 'Timber';
    user.password = 'Saw';
    user.token = 25;
    yield data_access_1.AppDataSource.manager.save(user);
})).catch((error) => {
    console.log(error);
});
