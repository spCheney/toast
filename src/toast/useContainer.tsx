import { Container } from "./Container"
import { DEFAULT_TOAST_VALUES } from "./DefaultValues"
import { populateStyle, updateAnimationDurations } from "./StyleFunctions"
import { ToastInterface, Action, iStyle, ActionTypes, ToastContainer } from "./Types"
import { toastReducer } from "./reducer"

/**
 * @param toastValues see {@link ToastInterface}
 * @param dispatch uses {@link toastReducer}
 * @returns Container component with the provide/default values
 */
export function useContainer(values: ToastContainer, dispatch: React.Dispatch<Action>) {
  return ({
    style,
    timeToastIsOpenFor = DEFAULT_TOAST_VALUES.timeToastIsOpenFor,
    openAnimationDuration = DEFAULT_TOAST_VALUES.openAnimationDuration,
    closeAnimationDuration = DEFAULT_TOAST_VALUES.closeAnimationDuration
  } : {
    style?: Partial<iStyle>,
    timeToastIsOpenFor?: number,
    openAnimationDuration?: number,
    closeAnimationDuration?: number
  }) => {

    updateAnimationDurations(timeToastIsOpenFor, openAnimationDuration, closeAnimationDuration, values, dispatch)

    return <Container
      style={ populateStyle(style) }
      toasts={ values.toasts }
      location={ values.location }
      openAnimationDuration={ openAnimationDuration }
      closeAnimationDuration={ closeAnimationDuration}
      close={ (toastId: string) => dispatch({ type: ActionTypes.close, toastId: toastId }) }
    />
  }
}