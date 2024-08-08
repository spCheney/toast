import { DEFAULT_STYLE } from "./DefaultValues"
import styles from "./toast.module.css"
import { ToastLocation, Action, ActionTypes, CssStyle, ToastContainer, ToastStatus } from "./Types"

/**
 * @param location see {@link ToastLocation}
 * @returns a css class used to position the popup in the selected location
 */
export function getLocationCSS(location: ToastLocation) {
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
    default:
      console.warn("The provided value isn't a valid location. Top left will be used by default")
      return styles.topLeft
  }
}

/**
 * @param status whether the toast should be opened or closed
 * @param location see {@link ToastLocation}
 * @returns an array of css classes combined into a string that the toast uses to set it's styling and the animations
 */
export function getCSSClasses(status: ToastStatus, location: ToastLocation) {
  var classes = []
  if(status === ToastStatus.created) {
    classes = [styles.toast, getOpenAnimation(location)]
  } else if(status === ToastStatus.open) {
    classes = [styles.toast, getOpenStyle(location)]
  } else {
    classes = [styles.toast, getOpenStyle(location), styles.close]
  }
  return classes.join(" ")
}

/**
 * @param location see {@link ToastLocation}
 * @returns a css class to animate the opening of the popup
 */
function getOpenAnimation(location: ToastLocation) {
  switch(location) {
    case ToastLocation.topLeft:
    case ToastLocation.bottomLeft:
      return styles.openLeftAni
    case ToastLocation.topRight:
    case ToastLocation.bottomRight:
      return styles.openRightAni
    case ToastLocation.topCenter:
      return styles.openTopAni
    case ToastLocation.bottomCenter:
      return styles.openBottomAni
  }
}

function getOpenStyle(location: ToastLocation) {
  switch(location) {
    case ToastLocation.topLeft:
    case ToastLocation.bottomLeft:
      return styles.openLeft
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
export function getAnimationVariables(openAnimationDuration: number, closeAnimationDuration: number) {
  return {
    "--open-animation-duration": openAnimationDuration + "s",
    "--close-animation-duration": closeAnimationDuration + "s"
  } as React.CSSProperties
}

/**
 * populates the provide style with the defaults for any missing values
 */
export function populateStyle(style?: Partial<CssStyle>) : CssStyle {
  if(style == undefined) {
    return DEFAULT_STYLE
  }

  return {
    color: style.color == undefined ? DEFAULT_STYLE.color : style.color,
    fontFamily: style.fontFamily == undefined ? DEFAULT_STYLE.fontFamily : style.fontFamily,
    fontSize: style.fontSize == undefined ? DEFAULT_STYLE.fontSize : style.fontSize,
    fontStyle: style.fontStyle == undefined ? DEFAULT_STYLE.fontStyle : style.fontStyle,
    fontWeight: style.fontWeight == undefined ? DEFAULT_STYLE.fontWeight : style.fontWeight,
    border: style.border == undefined ? DEFAULT_STYLE.border : style.border,
    backgroundColor: style.backgroundColor == undefined ? DEFAULT_STYLE.backgroundColor : style.backgroundColor
  }
}

export function getContainerStyle(style: CssStyle) {
  style = populateStyle(style)

  return {
    color: style.color,
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    fontStyle: style.fontStyle,
    fontWeight: style.fontWeight
  }
}

export function getToastStyle(style: CssStyle) {
  style = populateStyle(style)

  return {
    border: style.border,
    backgroundColor: style.backgroundColor
  }
}

/**
 * uses dispatch to update toast values with the durations if the current values are different then the ones provided
 */
export function updateAnimationDurations(timeToastIsOpenFor: number, openAnimationDuration: number, closeAnimationDuration: number, values: ToastContainer, dispatch: React.Dispatch<Action>) {
  if(timeToastIsOpenFor != values.timeToastIsOpenFor || openAnimationDuration != values.openAnimationDuration || closeAnimationDuration != values.closeAnimationDuration) {
    dispatch({
      type: ActionTypes.setAnimationDurations,
      timeToastIsOpenFor: timeToastIsOpenFor,
      openAnimationDuration: openAnimationDuration,
      closeAnimationDuration: closeAnimationDuration
    })
  }
}

/**
 * uses dispatch to set the multipleToast with if the current values are different then the ones provided
 */
export function updateNumOfToasts(numOfToasts: number, values: ToastContainer, dispatch: React.Dispatch<Action>) {
  if(numOfToasts !== values.numOfToasts) {
    dispatch({
      type: ActionTypes.setNumOfToasts,
      numOfToasts: numOfToasts
    })
  }
}
