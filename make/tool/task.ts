import { Base, SiteCallbackType } from '~'

export function addTask(base: Base, handle: SiteCallbackType): void {
  base.tasks.push(handle)
}

export function performNextTask(base: Base): void {
  const task = base.tasks.shift()
  if (task) {
    task()
  }
}
