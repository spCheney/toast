import styles from "./toast.module.css"
import { ContentType, LocationType, StatusType } from "./Values"

type Props = {
  status: StatusType,
  content: ContentType,
  location: LocationType,
  close: () => void,
}

export default function Toast({status, content, location, close}: Props) {

  const locationStyle = getLocation(location)
  const toastStyles = getStyle(status, location)
  const displayToast = toastStyles.length > 1

  function getLocation(location: LocationType) {
    if(location == "TOP-LEFT") {
      return styles.topLeft
    } else if(location == "BOTTOM-LEFT") {
      return styles.bottomLeft
    } else if(location == "TOP-RIGHT") {
      return styles.topRight
    } else if(location == "BOTTOM-RIGHT") {
      return styles.bottomRight
    }
  }

  function getStyle(status: StatusType, location: LocationType) {
    if(status == "OPEN") {
      return [styles.toast, getOpenAnimation(location)]
    } else if(status == "INITIATE CLOSE") {
      return [styles.toast, getOpenAnimation(location), getCloseAnimation(location)]
    } else {
      return [styles.toast]
    }
  }

  function getOpenAnimation(location: LocationType) {
    if(location == "TOP-LEFT" || location == "BOTTOM-LEFT") {
      return styles.open
    } else {
      return styles.openRight
    }
  }

  function getCloseAnimation(location: LocationType) {
    if(location == "TOP-LEFT" || location == "BOTTOM-LEFT") {
      return styles.close
    } else {
      return styles.closeRight
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
