import { getLocation, getAnimationVariables, getStyles } from "./AnimationFunctions"
import styles from "./toast.module.css"
import { ContentType, LocationType, StatusType } from "./Types"

export default function Toast({
    className,
    // status,
    content,
    // location,
    // openAnimationDuration,
    // closeAnimationDuration,
    close
  } : {
    className: string,
    // status: StatusType,
    content: ContentType,
    // location: LocationType,
    // openAnimationDuration: number,
    // closeAnimationDuration: number,
    close: () => void
  }) {

  // const locationStyle = getLocation(location)
  // const toastStyles = getStyles(status, location)
  // const animationVariables = getAnimationVariables(openAnimationDuration, closeAnimationDuration)
  // const displayToast = toastStyles.length > 1

  return (
    // <div className={ [styles.wrapper, locationStyle].join(' ') } style={animationVariables}>
    //   {!displayToast ? <></> :
    //   <div className={ toastStyles.join(' ') }>
    <div className={ className }>
        <span className={ styles.text }>
          { content }
        </span>
        <button onClick={ close } className={ styles.closeBtn }>x</button>
      </div>
    //   }
    // </div>
  )
}
