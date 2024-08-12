import React from "react"
import { Container } from "./Container"
import { DEFAULT_TOAST_CONTAINER } from "./DefaultValues"
import { populateStyle, updateAnimationDurations, updateNumOfToasts } from "./StyleFunctions"
import { Action, CssStyle, ActionTypes, ToastContainer, ToastStatus } from "./Types"
import { toastReducer } from "./reducer"

/**
 * @param toastValues see {@link ToastInterface}
 * @param dispatch uses {@link toastReducer}
 * @returns Container component with the provide/default values
 */
export function useContainer(values: ToastContainer, dispatch: React.Dispatch<Action>) {
  return ({
    style,
    timeToastIsOpenFor = DEFAULT_TOAST_CONTAINER.timeToastIsOpenFor,
    openAnimationDuration = DEFAULT_TOAST_CONTAINER.openAnimationDuration,
    closeAnimationDuration = DEFAULT_TOAST_CONTAINER.closeAnimationDuration,
    numOfToasts = DEFAULT_TOAST_CONTAINER.numOfToasts
  } : {
    style?: Partial<CssStyle>,
    timeToastIsOpenFor?: number,
    openAnimationDuration?: number,
    closeAnimationDuration?: number,
    numOfToasts?: number
  }) => {

    updateAnimationDurations(timeToastIsOpenFor, openAnimationDuration, closeAnimationDuration, values, dispatch)
    updateNumOfToasts(numOfToasts, values, dispatch)

    return <Container
      style={ populateStyle(style) }
      toasts={ values.toasts }
      location={ values.location }
      openAnimationDuration={ openAnimationDuration }
      closeAnimationDuration={ closeAnimationDuration }
      numOfToasts={ numOfToasts }
      close={ (toastId: string) => dispatch({ type: ActionTypes.update, toastId: toastId, status: ToastStatus.closed }) }
    />
  }
}