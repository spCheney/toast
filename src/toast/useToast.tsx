import { useReducer, useState } from "react";
import Toast from "./Toast";
import { toastReducer } from "./reducer";
import { LocationType, LocationValue, ToastValues } from "./Values";
import { updateStatus } from "./Hooks";

export default function useToast(): [() => JSX.Element, (content: JSX.Element) => void, (location: LocationType) => void] {

  const [location, setLocation] = useState<LocationType>(LocationValue)
  const [toastValues, dispatch] = useReducer(toastReducer, ToastValues)

  updateStatus(toastValues.status, dispatch)

  function open(content: JSX.Element) {
    dispatch({ type: "open", content: content })
  }

  function close() {
    dispatch({ type: "close" })
  }

  function updateLocation(location: LocationType) {
    setLocation(location)
  }

  function ToastComponent() {
    return (
      <Toast values={toastValues} location={location} close={close} />
    )
  }

  return [ ToastComponent, open, updateLocation ]
}