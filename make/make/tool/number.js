import _ from 'lodash';
export function assertNumber(object) {
    if (!code.isNumber(object)) {
        code.throwError(code.generateIncorrectlyTypedVariable('number'));
    }
}
export function isNumber(object) {
    return _.isNumber(object);
}
//# sourceMappingURL=number.js.map