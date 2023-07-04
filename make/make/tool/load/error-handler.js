export function watchUnhandledErrors() {
    process.on('unhandledRejection', (reason) => {
        if (reason instanceof BaseLinkError) {
            console.log(reason.stack);
        }
        else if (reason instanceof Error &&
            'stack' in reason &&
            code.isString(reason.stack)) {
            const text = code.renderError(reason.stack);
            console.log(text.join('\n'));
        }
        else {
            console.log(reason);
        }
    });
    process.on('uncaughtException', (error) => {
        if (code.isString(error.stack)) {
            const text = code.renderError(error.stack);
            console.log(text.join('\n'));
        }
        else {
            console.log(error.message ?? error);
        }
    });
}
//# sourceMappingURL=error-handler.js.map