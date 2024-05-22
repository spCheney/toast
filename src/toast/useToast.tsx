import { useReducer } from "react";
import Toast from "./Toast";
import { toastReducer } from "./reducer";
import { LocationType, ToastInterface, ToastValues } from "./Values";
import { updateStatus } from "./Hooks";

export default function useToast(): [() => JSX.Element, (content: JSX.Element) => void, (location: LocationType) => void] {

  const [toastValues, dispatch] = useReducer(toastReducer, ToastValues)

  updateStatus(toastValues.status, dispatch)

  function open(content: JSX.Element) {
    dispatch({ type: "open", content: content })
  }

  function close() {
    dispatch({ type: "close" })
  }

  function updateLocation(location: ToastInterface["location"]) {
    dispatch({ type: "update location", location: location })
  }

  return [ () => <Toast status={toastValues.status} content={toastValues.content} location={toastValues.location} close={close} />, open, updateLocation ]
}