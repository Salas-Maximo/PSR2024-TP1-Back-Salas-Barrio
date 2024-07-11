"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const INVALID_CONSTRUCTOR_PARAM = 'nameOrObj arg must a string or an object ' +
    'with the appropriate user keys.';
function new_(name, jefes, id) {
    return {
        id: (id !== null && id !== void 0 ? id : -1),
        name: (name !== null && name !== void 0 ? name : ''),
        jefes: []
    };
}
function from(param) {
    if (!isArea(param)) {
        throw new Error(INVALID_CONSTRUCTOR_PARAM);
    }
    const p = param;
    return new_(p.name, p.jefes, p.id);
}
function isArea(arg) {
    return (!!arg &&
        typeof arg === 'object' &&
        'id' in arg && typeof arg.id === 'number' &&
        'jefes' in arg && typeof arg.jefes === 'object' &&
        'name' in arg && typeof arg.name === 'string');
}
exports.default = {
    new: new_,
    from,
    isArea,
};
