import type { Eitherλ, Rightλ, Leftλ } from './Either';
import EitherModule from '.';
import { Resultλ } from '../Result/Result';
import { NonEmptyArrayλ } from '@algebraic/types/NonEmptyArray/NonEmptyArray';
import ResultModule from '../Result';

export { isLeft, isRight, fold, foldUnion, mapLeft, mapLeftU, fromResult };

/**
 * TODO: Add comment
 * @param p1
 */
const isLeft = <A, B>(p1: Eitherλ<A, B>): p1 is Leftλ<A> =>
  p1.λ.id === 'Left';

/**
 * TODO: Add comment
 * @param p1
 */
const isRight = <A, B>(p1: Eitherλ<A, B>): p1 is Rightλ<B> =>
  p1.λ.id === 'Right';


/**
 * TODO: Add comment
 * @param p1
 */
const fold = <A, B, C>(
  onLeft: (a: A) => C,
  onRight: (b: B) => C
) => (p1: Eitherλ<A, B>) =>
  isLeft (p1) ? onLeft (p1.λ.value) : onRight (p1.λ.value);

/**
 * TODO: Add comment
 * @param p1
 */
const foldUnion = <A, B>(p1: Eitherλ<A, B>): A | B =>
  p1.λ.value;

/**
 * TODO: Add comment
 * @param p1
 */
const mapLeft = <A, B, C>(p1: (a: A) => C) => (p2: Eitherλ<A, B>): Eitherλ<C, B> =>
  mapLeftU (p1, p2)

/**
 * TODO: Add comment
 * @param p1
 */
const mapLeftU = <A, B, C>(p1: (a: A) => C, p2: Eitherλ<A, B>): Eitherλ<C, B> =>
 isLeft (p2) ? EitherModule.λ.Left (p1 (p2.λ.value)) : p2

/**
 * TODO: Add comment
 * @param p1
 */
const fromResult = <A, B>(p1: Resultλ<A, B>): Eitherλ<NonEmptyArrayλ<A>, B> =>
ResultModule.λ.isFailure (p1) 
  ? EitherModule.λ.Left (p1.λ.value) 
  : EitherModule.λ.Right (p1.λ.value) 