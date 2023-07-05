import { Base } from '../form/base.js'

export function callTask(base: Base): void {
  const task = base.task.shift()
  if (task) {
    task()
  }
}

export function hostTask(base: Base, hook: SiteCallbackType): void {
  base.task.push(hook)
}
