import styles from "./toast.module.css"
import { LocationType, StatusType } from "./Types"

function getLocation(location: LocationType) {
  if(location == "TOP-LEFT") {
    return styles.topLeft
  } else if(location == "BOTTOM-LEFT") {
    return styles.bottomLeft
  } else if(location == "TOP-RIGHT") {
    return styles.topRight
  } else if(location == "BOTTOM-RIGHT") {
    return styles.bottomRight
  } else if(location == "TOP-CENTER") {
    return styles.topCenter
  } else if(location == "BOTTOM-CENTER") {
    return styles.bottomCenter
  }
}

function getStyles(status: StatusType, location: LocationType) {
  if(status == "OPEN") {
    return [styles.toast, getOpenAnimation(location)]
  } else if(status == "INITIATE CLOSE") {
    return [styles.toast, getOpenAnimation(location), styles.close]
  } else {
    return [styles.toast]
  }
}

function getOpenAnimation(location: LocationType) {
  if(location == "TOP-LEFT" || location == "BOTTOM-LEFT") {
    return styles.open
  } else if(location == "TOP-RIGHT" || location == "BOTTOM-RIGHT") {
    return styles.openRight
  } else if(location == "TOP-CENTER") {
    return styles.openTop
  } else {
    return styles.openBottom
  }
}

function getAnimationVariables(openAnimationDuration: number, closeAnimationDuration: number) {
  return {
    "--open-animation-duration": openAnimationDuration + "s",
    "--close-animation-duration": closeAnimationDuration + "s"
  } as React.CSSProperties
}

export { getLocation, getStyles, getAnimationVariables }