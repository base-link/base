import _ from 'lodash';
export function assertBoolean(object) {
    if (!code.isBoolean(object)) {
        code.throwError(code.generateIncorrectlyTypedVariable('boolean'));
    }
}
export function isBoolean(object) {
    return _.isBoolean(object);
}
//# sourceMappingURL=boolean.js.map