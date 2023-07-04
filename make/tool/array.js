import _ from 'lodash';
export function assertArray(object, name, path) {
    if (!code.isArray(object)) {
        code.throwError(code.generateIncorrectlyTypedVariable('array', name, path));
    }
}
export function isArray(object) {
    return _.isArray(object);
}
//# sourceMappingURL=array.js.map