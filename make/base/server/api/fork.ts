export function extendObject<
  X extends Object = Object,
  Y extends Object = Object,
>(x: X, y: Y): Omit<X, 'like'> & Y {
  return { ...x, ...y }
}
