import styles from "./toast.module.css"
import { LocationType, ToastInterface } from "./Values"
import { useLocation, useStyles } from "./Hooks"
import { useEffect, useRef, useState } from "react"

type Props = {
  status: ToastInterface["status"],
  content: ToastInterface["content"],
  location: ToastInterface["location"],
  close: () => void,
}

export default function Toast({status, content, location, close}: Props) {

  const locationStyle = getLocation(location)
  const toastStyles = getStyle(status)
  const displayToast = toastStyles.length > 1

  function getLocation(location: ToastInterface["location"]) {
    if(location == "TOP-LEFT") {
      return styles.topLeft
    } else if(location == "BOTTOM-LEFT") {
      return styles.bottomLeft
    }
  }

  function getStyle(status: ToastInterface["status"]) {
    if(status == "OPEN") {
      return [styles.toast, styles.open]
    } else if(status == "INITIATE CLOSE") {
      return [styles.toast, styles.open, styles.close]
    } else {
      return [styles.toast]
    }
  }

  return (
    <div className={ [styles.wrapper, locationStyle].join(' ') }>
      {!displayToast ? <></> :
      <div className={ toastStyles.join(' ') }>
        <span className={ styles.text }>
          { content }
        </span>
        <button onClick={ close } className={ styles.closeBtn }>x</button>
      </div>}
    </div>
  )
}
