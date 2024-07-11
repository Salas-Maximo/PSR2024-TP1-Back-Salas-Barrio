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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AREA_NOT_FOUND_ERR = void 0;
const AreaRepo_1 = __importDefault(require("@src/repos/AreaRepo"));
const classes_1 = require("@src/other/classes");
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
exports.AREA_NOT_FOUND_ERR = 'Area not found';
function getAll() {
    return AreaRepo_1.default.getAll();
}
function addOne(area) {
    return AreaRepo_1.default.add(area);
}
function updateOne(area) {
    return __awaiter(this, void 0, void 0, function* () {
        const persists = yield AreaRepo_1.default.persists(area.id);
        if (!persists) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.AREA_NOT_FOUND_ERR);
        }
        return AreaRepo_1.default.update(area);
    });
}
function _delete(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const persists = yield AreaRepo_1.default.persists(id);
        if (!persists) {
            throw new classes_1.RouteError(HttpStatusCodes_1.default.NOT_FOUND, exports.AREA_NOT_FOUND_ERR);
        }
        return AreaRepo_1.default.delete(id);
    });
}
exports.default = {
    getAll,
    addOne,
    updateOne,
    delete: _delete,
};
