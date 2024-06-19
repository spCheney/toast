import { getLocation, getStyles, getAnimationVariables } from "./StyleFunctions"
import { Toast } from "./Toast"
import { iStyle, StatusType, ContentType, ToastLocation } from "./Types"
import styles from "./toast.module.css"

/**
 * The container for the toast that will set it's location and styling
 * @param style see {@link iStyle}
 * @param status whether the toast is open or not
 * @param content what will be displayed in the toast popup
 * @param location see {@link ToastLocation}
 * @param openAnimationDuration how long it takes the toast to open
 * @param closeAnimationDuration how long it takes the toast to close
 * @param close used to close the toast
 */
export function Container(
  {
    style,
    status,
    content,
    location,
    openAnimationDuration,
    closeAnimationDuration,
    close,
  } : {
    /** see {@link iStyle} */
    style: iStyle,
    /** whether the toast is open or not */
    status: StatusType,
    /** what will be displayed in the toast popup */
    content: ContentType,
    /** see {@link ToastLocation} */
    location: ToastLocation,
    /** how long it takes the toast to open */
    openAnimationDuration: number,
    /** how long it takes the toast to close */
    closeAnimationDuration: number,
    /** used to close the toast */
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