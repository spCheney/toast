import React from "react"
import styles from "./toast.module.css"
import { Content } from "./Types"

/**
 * A simple popup that enters the screen similiar to toast popping out
 * of the toaster with content and styling specified by the parent
 * component
 */
export function Toast({
    className,
    content,
    style,
    close,
    id
  } : {
    className: string,
    content: Content,
    style: {
      border: string,
      backgroundColor: string
    },
    close: () => void,
    id: string
  }): JSX.Element {

  console.log("toast with id: " + id + " re-rendered at " + new Date())

  return (
    <div className={ className } style={ style }>
      <span className={ styles.text }>
        { content }
      </span>
      <button onClick={ close } className={ styles.closeBtn }>x</button>
    </div>
  )
}
