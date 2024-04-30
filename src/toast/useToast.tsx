import { useEffect, useState } from "react";
import Toast from "./Toast";

export default function useToast(): [() => JSX.Element, (content: JSX.Element) => void] {
  //all in seconds
  const timeToastIsOpenFor = 20
  const closeAnimationDuration = 0.3
  const openAnimationDuration = 0.1

  const [toastStatus, setToastStatus] = useState<"CLOSED" | "OPEN" | "INITIATE CLOSE">("CLOSED")
  const [content, setContent] = useState(<>just a test</>)

  useEffect(() => {
    if(toastStatus == "INITIATE CLOSE") {
      setTimeout(() => {
        setToastStatus("CLOSED")
      }, closeAnimationDuration * 1000)
    }
  }, [toastStatus])

  function open(content: JSX.Element) {
    setContent(content)
    setToastStatus("OPEN")
  }

  function close() {
    setToastStatus("INITIATE CLOSE")
  }

  function closeComplete() {
    setToastStatus("CLOSED")
  }

  function ToastComponent() {
    return (
      <Toast toastStatus={toastStatus} close={close} content={content} />
    )
  }

  return [ ToastComponent, open ]
}