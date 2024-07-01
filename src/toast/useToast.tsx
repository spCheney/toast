import { useReducer } from "react";
import { toastReducer } from "./reducer";
import { Content, LocationInterface, Style } from "./Types";
import { updateStatus, useLocation, useOpenFunction } from "./Hooks";
import { DEFAULT_TOAST_CONTAINER } from "./DefaultValues";
import { useContainer } from "./useContainer";

export default function useToast(): [
  ({
    style,
    timeToastIsOpenFor,
    openAnimationDuration,
    closeAnimationDuration,
  } : {
    style?: Partial<Style>,
    timeToastIsOpenFor?: number,
    openAnimationDuration?: number,
    closeAnimationDuration?: number,
  }) => JSX.Element,
  (content: Content) => void,
  Readonly<LocationInterface>
] {

  const [values, dispatch] = useReducer(toastReducer, DEFAULT_TOAST_CONTAINER)

  updateStatus(values.toasts, values.location, dispatch, values.timeToastIsOpenFor, values.openAnimationDuration, values.closeAnimationDuration)

  const open = useOpenFunction(dispatch)
  const Location = useLocation(dispatch)

  return [ useContainer(values, dispatch), open, Location ]
}