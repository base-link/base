import _ from 'lodash';
export function assertString(object, name, path) {
    if (!code.isString(object)) {
        code.throwError(code.generateIncorrectlyTypedVariable('string', name, path));
    }
}
export function assertStringPattern(input, string, pattern) {
    if (!string.match(pattern)) {
        // code.throwError(code.generateInvalidPatternError(input, pattern))
    }
}
export function isString(object) {
    return _.isString(object);
}
//# sourceMappingURL=string.js.map