import React from "react"
import { Container } from "./Container"
import { DEFAULT_TOAST_CONTAINER } from "./DefaultValues"
import { populateStyle, updateAnimationDurations, updateMultipleToasts } from "./StyleFunctions"
import { Action, CssStyle, ActionTypes, ToastContainer } from "./Types"
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
    multipleToasts = DEFAULT_TOAST_CONTAINER.multipleToasts
  } : {
    style?: Partial<CssStyle>,
    timeToastIsOpenFor?: number,
    openAnimationDuration?: number,
    closeAnimationDuration?: number,
    multipleToasts?: boolean
  }) => {

    updateAnimationDurations(timeToastIsOpenFor, openAnimationDuration, closeAnimationDuration, values, dispatch)
    updateMultipleToasts(multipleToasts, values, dispatch)

    return <Container
      style={ populateStyle(style) }
      toasts={ values.toasts }
      location={ values.location }
      openAnimationDuration={ openAnimationDuration }
      closeAnimationDuration={ closeAnimationDuration }
      close={ (toastId: string) => dispatch({ type: ActionTypes.close, toastId: toastId }) }
    />
  }
}