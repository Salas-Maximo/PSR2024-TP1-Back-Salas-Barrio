"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
    'with the appropriate user keys.';
function new_(name, id) {
    return {
        id: (id !== null && id !== void 0 ? id : -1),
        name: (name !== null && name !== void 0 ? name : '')
    };
}
function from(param) {
    if (!isPersonal(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param;
    return new_(p.name, p.id);
}
function isPersonal(arg) {
    return (!!arg &&
        typeof arg === 'object' &&
        'id' in arg && typeof arg.id === 'number' &&
        'nombre' in arg && typeof arg.nombre === 'string');
}
exports.default = {
    new: new_,
    from,
    isPersonal,
};
