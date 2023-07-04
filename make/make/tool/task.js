export function callTask(base) {
    const task = base.task.shift();
    if (task) {
        task();
    }
}
export function hostTask(base, hook) {
    base.task.push(hook);
}
//# sourceMappingURL=task.js.map