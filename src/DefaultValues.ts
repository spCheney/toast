import { ToastContainer, ToastLocation, Style } from "./Types";

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
export const DEFAULT_STYLE: Style = {
  color: "black",
  fontFamily: "default",
  fontStyle: "normal",
  fontSize: 16,
  fontWeight: 400
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
