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
        for (const jefe of db.jefes) {
            if (jefe.name === name) {
                return jefe;
            }
        }
        return null;
    });
}
function persists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (const jefe of db.jefes) {
            if (jefe.id === id) {
                return true;
            }
        }
        return false;
    });
}
function getAll(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        const db = yield MockOrm_1.default.openDb();
        for (const area of db.areas) {
            if (area.id === id) {
                return area.jefes;
            }
        }
        return db.jefes;
    });
}
function add(jefe, idArea) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(idArea);
        const db = yield MockOrm_1.default.openDb();
        for (const area of db.areas) {
            if (area.id === idArea) {
                area.jefes.push(jefe);
            }
        }
        return MockOrm_1.default.saveDb(db);
    });
}
function update(jefe) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (let i = 0; i < db.jefes.length; i++) {
            if (db.jefes[i].id === jefe.id) {
                const dbjefe = db.jefes[i];
                db.jefes[i] = Object.assign(Object.assign({}, dbjefe), { name: jefe.name, personales: jefe.personales });
                return MockOrm_1.default.saveDb(db);
            }
        }
    });
}
function delete_(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (let i = 0; i < db.jefes.length; i++) {
            if (db.jefes[i].id === id) {
                db.jefes.splice(i, 1);
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
