/**
 * @since 2.2.7
 */
import { Semigroup } from 'fp-ts/lib/Semigroup'

/**
 * @category model
 * @since 2.2.7
 */
export interface Of<A> {
  readonly _tag: 'Of'
  readonly value: A
}

/**
 * @category model
 * @since 2.2.7
 */
export interface Concat<A> {
  readonly _tag: 'Concat'
  readonly left: FreeSemigroup<A>
  readonly right: FreeSemigroup<A>
}

/**
 * @category model
 * @since 2.2.7
 */
export type FreeSemigroup<A> = Of<A> | Concat<A>

/**
 * @category constructors
 * @since 2.2.7
 */
export const of = <A>(a: A): FreeSemigroup<A> => ({ _tag: 'Of', value: a })

/**
 * @category constructors
 * @since 2.2.7
 */
export const concat = <A>(left: FreeSemigroup<A>, right: FreeSemigroup<A>): FreeSemigroup<A> => ({
  _tag: 'Concat',
  left,
  right
})

/**
 * @category destructors
 * @since 2.2.7
 */
export const fold = <A, R>(onOf: (value: A) => R, onConcat: (left: FreeSemigroup<A>, right: FreeSemigroup<A>) => R) => (
  f: FreeSemigroup<A>
): R => {
  switch (f._tag) {
    case 'Of':
      return onOf(f.value)
    case 'Concat':
      return onConcat(f.left, f.right)
  }
}

/**
 * @category instances
 * @since 2.2.7
 */
export function getSemigroup<A = never>(): Semigroup<FreeSemigroup<A>> {
  return { concat }
}
