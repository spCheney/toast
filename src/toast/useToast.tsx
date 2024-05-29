import { useReducer } from "react";
import Toast from "./Toast";
import { toastReducer } from "./reducer";
import { ContentType, LocationInterface, LocationType, ToastInterface } from "./Types";
import { updateStatus } from "./Hooks";

export default function useToast(): [() => JSX.Element, (content: ContentType) => void, LocationInterface] {

  //all in seconds
  const timeToastIsOpenFor = 20
  const closeAnimationDuration = 0.3
  const openAnimationDuration = 0.1

  const DefaultValues: ToastInterface = {
    content: <></>,
    status: "CLOSED",
    location: "TOP-LEFT"
  }

  const [toastValues, dispatch] = useReducer(toastReducer, DefaultValues)

  updateStatus(toastValues.status, toastValues.location, dispatch, timeToastIsOpenFor, openAnimationDuration, closeAnimationDuration)

  function open(content: ContentType) {
    dispatch({ type: "open", content: content })
  }

  function close() {
    dispatch({ type: "close" })
  }

  const Location: Readonly<LocationInterface> = {
    bottomCenter: "BOTTOM-CENTER",
    bottomLeft: "BOTTOM-LEFT",
    bottomRight: "BOTTOM-RIGHT",
    topCenter: "TOP-CENTER",
    topLeft: "TOP-LEFT",
    topRight: "TOP-RIGHT",
    update(location: LocationType) {
      dispatch({ type: "update location", location: location })
    }
  }

  return [ () => <Toast status={toastValues.status} content={toastValues.content} location={toastValues.location} close={close} openAnimationDuration={openAnimationDuration} closeAnimationDuration={closeAnimationDuration} />, open, Location ]
}