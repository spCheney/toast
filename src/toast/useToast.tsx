import { useReducer } from "react";
import Toast from "./Toast";
import { toastReducer } from "./reducer";
import { ContentType, DefaultValues, LocationType } from "./Values";
import { updateStatus } from "./Hooks";

export default function useToast(): [() => JSX.Element, (content: ContentType) => void, (location: LocationType) => void] {

  const [toastValues, dispatch] = useReducer(toastReducer, DefaultValues)

  updateStatus(toastValues.status, dispatch)

  function open(content: ContentType) {
    dispatch({ type: "open", content: content })
  }

  function close() {
    dispatch({ type: "close" })
  }

  function updateLocation(location: LocationType) {
    dispatch({ type: "update location", location: location })
  }

  return [ () => <Toast status={toastValues.status} content={toastValues.content} location={toastValues.location} close={close} />, open, updateLocation ]
}