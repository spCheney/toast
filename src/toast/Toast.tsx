import styles from "./toast.module.css"
import { LocationType, ToastInterface } from "./Values"
import { useLocation, useStyles } from "./Hooks"

type Props = {
  values: ToastInterface,
  location: LocationType,
  close: () => void,
}

export default function Toast({values, location, close}: Props) {

  const locationStyle = useLocation(location)
  const toastStyles = useStyles(values.status)

  return (
    <div className={ [styles.wrapper, locationStyle].join(' ') }>
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