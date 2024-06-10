import Container from "./Container"
import { DefaultStyle } from "./DefaultValues"
import { ToastInterface, ActionInterface, iStyle } from "./Types"

function populateStyle(style?: iStyle) {
  if(style == undefined) {
    style = DefaultStyle
  }

  if(style.color == undefined) {
    style.color = DefaultStyle.color
  }

  if(style.fontFamily == undefined) {
    style.fontFamily = DefaultStyle.fontFamily
  }

  if(style.fontSize == undefined) {
    style.fontSize = DefaultStyle.fontSize
  }

  if(style.fontStyle == undefined) {
    style.fontStyle = DefaultStyle.fontStyle
  }

  if(style.fontWeight == undefined) {
    style.fontWeight = DefaultStyle.fontWeight
  }

  return style
}

export default function useContainer(toastValues: ToastInterface, dispatch: React.Dispatch<ActionInterface>) {

  return ({
    style,
    timeToastIsOpenFor = toastValues.timeToastIsOpenFor,
    openAnimationDuration = toastValues.openAnimationDuration,
    closeAnimationDuration = toastValues.closeAnimationDuration
  } : {
    style?: iStyle,
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

    style = populateStyle(style)

    return <Container
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