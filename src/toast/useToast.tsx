import { useReducer } from "react";
import { toastReducer } from "./reducer";
import { ContentType, LocationInterface, iStyle } from "./Types";
import { updateStatus, useLocation, useOpenFunction } from "./Hooks";
import { DEFAULT_TOAST_CONTAINER, DEFAULT_TOAST_VALUES } from "./DefaultValues";
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

  const [toastValues, dispatch] = useReducer(toastReducer, DEFAULT_TOAST_CONTAINER)

  updateStatus(toastValues.status, toastValues.location, dispatch, toastValues.timeToastIsOpenFor, toastValues.openAnimationDuration, toastValues.closeAnimationDuration)

  const open = useOpenFunction(dispatch)
  const Location = useLocation(dispatch)

  return [ useContainer(toastValues, dispatch), open, Location ]
}