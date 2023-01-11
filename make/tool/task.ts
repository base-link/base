import { Base } from '~'

export function addTask(base: Base, handle: () => void): void {
  base.tasks.push(handle)
}

export function performNextTask(base: Base): void {
  const task = base.tasks.shift()
  if (task) {
    task()
  }
}
