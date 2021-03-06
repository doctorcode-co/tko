
import {
  removeNode, addDisposeCallback
} from '@tko/utils'

import {
  isObservable, unwrap
} from '@tko/observable'

import {
  contextFor, applyBindings
} from '@tko/bind'

import {
  NativeProvider
} from '@tko/provider.native'

import {
  JsxObserver, ORIGINAL_JSX_SYM
 } from './JsxObserver'

/**
 *
 * @param {any} possibleJsx Test whether this value is JSX.
 *
 * True for
 *    { elementName }
 *    [{elementName}]
 *    observable({elementName} | [])
 *
 * Any observable will return truthy if its value is an array that doesn't
 * contain HTML elements.  Template nodes should not be observable unless they
 * are JSX.
 *
 * There's a bit of guesswork here that we could nail down with more test cases.
 */
export function maybeJsx (possibleJsx) {
  if (isObservable(possibleJsx)) { return true }
  const value = unwrap(possibleJsx)
  if (!value) { return false }
  if (value.elementName) { return true }
  if (!Array.isArray(value) || !value.length) { return false }
  if (value[0] instanceof window.Node) { return false }
  return true
}

export function getOriginalJsxForNode (node) {
  return node[ORIGINAL_JSX_SYM]
}
