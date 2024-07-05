import { ToastContainer, ToastLocation, CssStyle } from "./Types";

/**
 * color - black
 *
 * fontFamily - default
 *
 * fontStyle - normal
 *
 * fontSize - 16
 *
 * fontWeight - 400
 */
export const DEFAULT_STYLE: CssStyle = {
  color: "black",
  fontFamily: "default",
  fontStyle: "normal",
  fontSize: 16,
  fontWeight: 400,
  border: "2px solid transparent",
  backgroundColor: "#fafafa"
}

/**
 * toasts - []
 *
 * location - ToastLocation.topLeft
 *
 * timeToastIsOpenFor - 20
 *
 * closeAnimationDuration - 0.3
 *
 * openAnimationDuration - 0.1
 *
 * multipleToasts - false
 */
export const DEFAULT_TOAST_CONTAINER: ToastContainer = {
  toasts: [],
  location: ToastLocation.topLeft,
  timeToastIsOpenFor: 20,
  closeAnimationDuration: 0.3,
  openAnimationDuration: 0.1,
  multipleToasts: false
}
