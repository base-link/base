export function addTask(base, handle) {
    base.tasks.push(handle);
}
export function performNextTask(base) {
    const task = base.tasks.shift();
    if (task) {
        task();
    }
}
//# sourceMappingURL=task.js.map