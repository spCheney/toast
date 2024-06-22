import { useReducer } from "react";
import { toastReducer } from "./reducer";
import { ContentType, LocationInterface, iStyle } from "./Types";
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
    style?: Partial<iStyle>,
    timeToastIsOpenFor?: number,
    openAnimationDuration?: number,
    closeAnimationDuration?: number,
  }) => JSX.Element,
  (content: ContentType) => void,
  Readonly<LocationInterface>
] {

  const [values, dispatch] = useReducer(toastReducer, DEFAULT_TOAST_CONTAINER)

  updateStatus(values.toasts, values.location, dispatch, values.timeToastIsOpenFor, values.openAnimationDuration, values.closeAnimationDuration)

  const open = useOpenFunction(dispatch)
  const Location = useLocation(dispatch)

  return [ useContainer(values, dispatch), open, Location ]
}