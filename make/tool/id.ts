let OBJECT_ID = 1
let WATCHER_ID = 1

export function generateObjectId(): number {
  return OBJECT_ID++
}

export function generateWatcherId(): number {
  return WATCHER_ID++
}
