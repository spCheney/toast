import { useReducer } from "react";
import ToastContext from "./ToastContext";
import Toast from "./Toast";
import styles from "./toast.module.css"
import toastReducer from "./toastReducer";

export default function ToastProvider({ children }) {
  const initialValues = {
    location: styles.topLeft,
    content: <></>,
    initiateOpen: false,
    initiateClose: false,
  }

  const [toastValues, dispatch] = useReducer(toastReducer, initialValues)

  return (
    <ToastContext.Provider value={ dispatch }>
      { children }
      <Toast values={ toastValues } />
    </ToastContext.Provider>
  )
}