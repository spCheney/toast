import { getLocation, getStyles, getAnimationVariables } from "./AnimationFunctions"
import Toast from "./Toast"
import { iStyle, StatusType, ContentType, LocationType } from "./Types"
import styles from "./toast.module.css"

export default function Container(
  {
    style,
    status,
    content,
    location,
    openAnimationDuration,
    closeAnimationDuration,
    close
  } : {
    style: iStyle,
    status: StatusType,
    content: ContentType,
    location: LocationType,
    openAnimationDuration: number,
    closeAnimationDuration: number,
    close: () => void
  }
) {

  const locationClass = getLocation(location)
  const toastStyles = getStyles(status, location)
  const animationVariables = getAnimationVariables(openAnimationDuration, closeAnimationDuration)
  const displayToast = toastStyles.length > 1

  return (
    <div className={ [styles.container, locationClass].join(' ') } style={{ ...animationVariables, ...style }}>
      {!displayToast ? <></> :
        <Toast className={ toastStyles.join(' ') } content={ content } close={ close }/>
      }
    </div>
  )
}