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
const JefeService_1 = __importDefault(require("@src/services/JefeService"));
const HttpStatusCodes_1 = __importDefault(require("@src/constants/HttpStatusCodes"));
function getAll(_, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = Number(_.params.idA);
        console.log(id);
        const jefe = yield JefeService_1.default.getAll(id);
        return res.status(HttpStatusCodes_1.default.OK).json({ jefe });
    });
}
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { jefe } = req.body;
        const { idA } = req.params;
        console.log(jefe);
        yield JefeService_1.default.addOne(jefe, Number(idA));
        return res.status(HttpStatusCodes_1.default.CREATED).end();
    });
}
function update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { jefe } = req.body;
        yield JefeService_1.default.updateOne(jefe);
        return res.status(HttpStatusCodes_1.default.OK).end();
    });
}
function delete_(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = +req.params.id;
        yield JefeService_1.default.delete(id);
        return res.status(HttpStatusCodes_1.default.OK).end();
    });
}
exports.default = {
    getAll,
    add,
    update,
    delete: delete_,
};
