import { getAnimationVariables, getLocation, getStyles } from "./AnimationFunctions"
import Toast from "./Toast"
import { StatusType, ContentType, LocationType, iStyle, ToastInterface, ActionInterface } from "./Types"
import styles from "./toast.module.css"

function Wrapper(
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
    <div className={ [styles.wrapper, locationClass].join(' ') } style={{ ...animationVariables, ...style }}>
      {!displayToast ? <></> :
        <Toast className={ toastStyles.join(' ') } content={ content } close={ close }/>
      }
    </div>
  )
}

export default function useWrapper(toastValues: ToastInterface, dispatch: React.Dispatch<ActionInterface>) {

  return ({
    style,
    timeToastIsOpenFor = toastValues.timeToastIsOpenFor,
    openAnimationDuration = toastValues.openAnimationDuration,
    closeAnimationDuration = toastValues.closeAnimationDuration
  } : {
    style: iStyle,
    timeToastIsOpenFor?: number,
    openAnimationDuration?: number,
    closeAnimationDuration?: number
  }) => {

    if(timeToastIsOpenFor != toastValues.timeToastIsOpenFor || openAnimationDuration !== toastValues.openAnimationDuration || closeAnimationDuration != toastValues.closeAnimationDuration) {
      dispatch({
        type: "update animation durations",
        timeToastIsOpenFor: timeToastIsOpenFor,
        openAnimationDuration: openAnimationDuration,
        closeAnimationDuration: closeAnimationDuration
      })
    }

    return <Wrapper
      style={ style }
      status={ toastValues.status }
      content={ toastValues.content }
      location={ toastValues.location }
      openAnimationDuration={ openAnimationDuration }
      closeAnimationDuration={ closeAnimationDuration}
      close={ () => dispatch({ type: "close" }) }
    />
  }
}