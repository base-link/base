type LikeableType = Object & {
  like: string
}

export function extendObject<
  X extends LikeableType = LikeableType,
  Y extends Object = Object,
>({ like, ...x }: X, y: Y): Omit<X, 'like'> & Y {
  return { ...x, ...y }
}
