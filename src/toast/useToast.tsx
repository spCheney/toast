import { useReducer } from "react";
import Toast from "./Toast";
import { toastReducer } from "./reducer";
import { ContentType, LocationInterface, ToastInterface, iStyle } from "./Types";
import { updateStatus, useLocation, useOpenFunction } from "./Hooks";
import useContainer from "./useContainer";

export default function useToast(): [({ style, timeToastIsOpenFor, openAnimationDuration, closeAnimationDuration }: {    style: iStyle;    timeToastIsOpenFor?: number;    openAnimationDuration?: number;    closeAnimationDuration?: number;}) => JSX.Element, (content: ContentType) => void, LocationInterface] {

  const DefaultValues: ToastInterface = {
    content: <></>,
    status: "CLOSED",
    location: "TOP-LEFT",
    timeToastIsOpenFor: 20,
    closeAnimationDuration: 0.3,
    openAnimationDuration: 0.1
  }

  const [toastValues, dispatch] = useReducer(toastReducer, DefaultValues)

  updateStatus(toastValues.status, toastValues.location, dispatch, toastValues.timeToastIsOpenFor, toastValues.openAnimationDuration, toastValues.closeAnimationDuration)

  const open = useOpenFunction(dispatch)
  const Location = useLocation(dispatch)

  return [ useContainer(toastValues, dispatch) , open, Location ]
}