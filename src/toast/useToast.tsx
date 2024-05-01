import { useReducer } from "react";
import Toast from "./Toast";
import { toastReducer } from "./reducer";
import { ToastValues } from "./Values";
import { updateStatus } from "./Hooks";

export default function useToast(): [() => JSX.Element, (content: JSX.Element) => void] {

  const [toastValues, dispatch] = useReducer(toastReducer, ToastValues)

  updateStatus(toastValues.status, dispatch)

  function open(content: JSX.Element) {
    dispatch({ type: "open", content: content })
  }

  function close() {
    dispatch({ type: "close" })
  }

  function ToastComponent() {
    return (
      <Toast values={toastValues} close={close} />
    )
  }

  return [ ToastComponent, open ]
}