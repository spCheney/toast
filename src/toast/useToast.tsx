import { useReducer } from "react";
import Toast from "./Toast";
import styles from "./toast.module.css"
import toastReducer from "./toastReducer";

export default function useToast() {
  const initialValues = {
    location: styles.topLeft,
    content: <></>,
    initiateOpen: false,
    initiateClose: false,
  }

  const [toastValues, dispatch] = useReducer(toastReducer, initialValues)
  const component = <Toast values={ toastValues } dispatch={ dispatch } />

  return [component, dispatch]
}