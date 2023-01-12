let OBJECT_ID = 1
let OBSERVER_ID = 1

export function generateObjectId(): number {
  return OBJECT_ID++
}

export function generateObserverId(): number {
  return OBSERVER_ID++
}
