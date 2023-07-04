export const ERROR = [
    {
        code: '0002',
        note: ({ name, scope }) => scope
            ? `We haven't implemented handling the term \`${name}\` within \`${scope}\` yet.`
            : `We haven't implemented handling the term \`${name}\` yet.`,
    },
    {
        code: '0001',
        note: ({ term }) => `We haven't implemented handling term interpolation yet, for ${term}.`,
    },
].reduce(errorReducer, {});
function errorReducer(m, x) {
    return {
        ...m,
        [x.code]: {
            isError: true,
            ...x,
        },
    };
}
//# sourceMappingURL=content.js.map