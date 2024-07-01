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
    close
  } : {
    className: string,
    content: Content,
    close: () => void
  }): JSX.Element {

  return (
    <div className={ className }>
      <span className={ styles.text }>
        { content }
      </span>
      <button onClick={ close } className={ styles.closeBtn }>x</button>
    </div>
  )
}
