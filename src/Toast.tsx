import React, { useEffect, useState } from "react"
import styles from "./toast.module.css"
import { Content, ToastLocation, ToastValues } from "./Types"
import { getCSSClasses } from "./StyleFunctions"

/**
 * A simple popup that enters the screen similiar to toast popping out
 * of the toaster with content and styling specified by the parent
 * component
 */
export function Toast({
    toast,
    location,
    style,
    close,
  } : {
    toast: ToastValues,
    location: ToastLocation,
    style: {
      border: string,
      backgroundColor: string
    },
    close: (id: string) => void,
  }): JSX.Element {

  const [className, setClassName] = useState( getCSSClasses(toast.status, location) )

  useEffect(() => {
    setClassName( getCSSClasses(toast.status, location) )
  }, [toast.status, location])

  return (
    <div className={ className } style={ style }>
      <span className={ styles.text }>
        { toast.content }
      </span>
      <button onClick={ () => close(toast.id) } className={ styles.closeBtn }>x</button>
    </div>
  )
}
