import { DEFAULT_STYLE } from "./DefaultValues"
import styles from "./toast.module.css"
import { ToastLocation, StatusType, Action, ActionTypes, ToastInterface, iStyle } from "./Types"

/**
 * @param location see {@link ToastLocation}
 * @returns a css class used to position the popup in the selected location
 */
function getLocation(location: ToastLocation) {
  switch(location) {
    case ToastLocation.topLeft:
      return styles.topLeft
    case ToastLocation.bottomLeft:
      return styles.bottomLeft
    case ToastLocation.topRight:
      return styles.topRight
    case ToastLocation.bottomRight:
      return styles.bottomRight
    case ToastLocation.topCenter:
      return styles.topCenter
    case ToastLocation.bottomCenter:
      return styles.bottomCenter
  }
}

/**
 * @param status whether the toast should be opened or closed
 * @param location see {@link ToastLocation}
 * @returns an array of css classes to be provided to the toast to set it's styling and the animations
 */
function getStyles(status: StatusType, location: ToastLocation) {
  if(status == "OPEN") {
    return [styles.toast, getOpenAnimation(location)]
  } else if(status == "INITIATE CLOSE") {
    return [styles.toast, getOpenAnimation(location), styles.close]
  } else {
    return [styles.toast]
  }
}

/**
 * @param location see {@link ToastLocation}
 * @returns a css class to animate the opening of the popup
 */
function getOpenAnimation(location: ToastLocation) {
  switch(location) {
    case ToastLocation.topLeft:
    case ToastLocation.bottomLeft:
      return styles.open
    case ToastLocation.topRight:
    case ToastLocation.bottomRight:
      return styles.openRight
    case ToastLocation.topCenter:
      return styles.openTop
    case ToastLocation.bottomCenter:
      return styles.openBottom
  }
}

/**
 * Should be used in the style property of the element not the classname
 * @param openAnimationDuration how long it takes for the toast to open
 * @param closeAnimationDuration how long it takes for the toast to close
 * @returns an object with the css variables set to determine the duration of the animations
 */
function getAnimationVariables(openAnimationDuration: number, closeAnimationDuration: number) {
  return {
    "--open-animation-duration": openAnimationDuration + "s",
    "--close-animation-duration": closeAnimationDuration + "s"
  } as React.CSSProperties
}

/**
 * populates the provide style with the defaults for any missing values
 */
export function populateStyle(style?: Partial<iStyle>) : iStyle {
  if(style == undefined) {
    return DEFAULT_STYLE
  }

  return {
    color: style.color == undefined ? DEFAULT_STYLE.color : style.color,
    fontFamily: style.fontFamily == undefined ? DEFAULT_STYLE.fontFamily : style.fontFamily,
    fontSize: style.fontSize == undefined ? DEFAULT_STYLE.fontSize : style.fontSize,
    fontStyle: style.fontStyle == undefined ? DEFAULT_STYLE.fontStyle : style.fontStyle,
    fontWeight: style.fontWeight == undefined ? DEFAULT_STYLE.fontWeight : style.fontWeight
  }
}

/**
 * uses dispatch to update toast values with the durations if the current values are different then the ones provided
 */
export function updateAnimationDurations(timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number, toastValues: ToastInterface, dispatch: React.Dispatch<Action>) {
  if(timeToastIsOpenFor != toastValues.timeToastIsOpenFor || openAnimationDuration != toastValues.openAnimationDuration || closeAnimationDuration != toastValues.closeAnimationDuration) {
    dispatch({
      type: ActionTypes.updateAnimationDurations,
      timeToastIsOpenFor: timeToastIsOpenFor,
      openAnimationDuration: openAnimationDuration,
      closeAnimationDuration: closeAnimationDuration
    })
  }
}

export { getLocation, getStyles, getAnimationVariables }