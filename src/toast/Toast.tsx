import { useEffect, useState } from "react"
import styles from "./toast.module.css"
import { ToastInterface } from "./Values"
import { useStyles } from "./Hooks"

type Props = {
  values: ToastInterface,
  close: () => void,
}

export default function Toast({values, close}: Props) {

  const [location, setLocation] = useState(styles.topLeft)
  const toastStyles = useStyles(values.status)

  return (
    <div className={ [styles.wrapper, location].join(' ') }>
      {values.status === "CLOSED" ? <></> :
      <div className={ toastStyles.join(' ') }>
        <span className={ styles.text }>
          { values.content }
        </span>
        <button onClick={ close } className={ styles.closeBtn }>x</button>
      </div>}
    </div>
  )
}