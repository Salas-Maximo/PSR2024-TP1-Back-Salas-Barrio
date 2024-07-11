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
const MockOrm_1 = __importDefault(require("./MockOrm"));
function getOne(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (const personal of db.personales) {
            if (personal.name === name) {
                return personal;
            }
        }
        return null;
    });
}
function persists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (const personal of db.personales) {
            if (personal.id === id) {
                return true;
            }
        }
        return false;
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        return db.personales;
    });
}
function add(personal, idArea, idJefe) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (const area of db.areas) {
            if (area.id === idArea) {
                for (const jefe of area.jefes) {
                    if (jefe.id === idJefe) {
                        jefe.personales.push(personal);
                    }
                }
            }
        }
        db.personales.push(personal);
        return MockOrm_1.default.saveDb(db);
    });
}
function update(personal) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (let i = 0; i < db.personales.length; i++) {
            if (db.personales[i].id === personal.id) {
                const dbpersonal = db.personales[i];
                db.personales[i] = Object.assign(Object.assign({}, dbpersonal), { name: personal.name });
                return MockOrm_1.default.saveDb(db);
            }
        }
    });
}
function delete_(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (let i = 0; i < db.personales.length; i++) {
            if (db.personales[i].id === id) {
                db.personales.splice(i, 1);
                return MockOrm_1.default.saveDb(db);
            }
        }
    });
}
exports.default = {
    getOne,
    persists,
    getAll,
    add,
    update,
    delete: delete_,
};
