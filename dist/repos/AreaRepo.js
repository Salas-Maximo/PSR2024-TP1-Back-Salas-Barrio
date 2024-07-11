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
const misc_1 = require("src/util/misc");
const MockOrm_1 = __importDefault(require("./MockOrm"));
function getOne(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (const area of db.areas) {
            if (area.name === name) {
                return area;
            }
        }
        return null;
    });
}
function persists(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (const area of db.areas) {
            if (area.id === id) {
                return true;
            }
        }
        return false;
    });
}
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        return db.areas;
    });
}
function add(area) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        area.id = (0, misc_1.getRandomInt)();
        db.areas.push(area);
        return MockOrm_1.default.saveDb(db);
    });
}
function update(area) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (let i = 0; i < db.areas.length; i++) {
            if (db.areas[i].id === area.id) {
                const dbarea = db.areas[i];
                db.areas[i] = Object.assign(Object.assign({}, dbarea), { name: area.name, jefes: area.jefes });
                return MockOrm_1.default.saveDb(db);
            }
        }
    });
}
function delete_(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield MockOrm_1.default.openDb();
        for (let i = 0; i < db.areas.length; i++) {
            if (db.areas[i].id === id) {
                db.areas.splice(i, 1);
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
