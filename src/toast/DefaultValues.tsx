import { ToastContainer, ToastInterface, ToastLocation, iStyle } from "./Types";

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
const DEFAULT_STYLE: iStyle = {
  color: "black",
  fontFamily: "default",
  fontStyle: "normal",
  fontSize: 16,
  fontWeight: 400
}

/**
 * content - <></>
 *
 * status - CLOSED
 *
 * location - ToastLocation.topLeft
 *
 * timeToastIsOpenFor - 20
 *
 * closeAnimationDuration - 0.3
 *
 * openAnimationDuration - 0.1
 */
const DEFAULT_TOAST_VALUES: ToastInterface = {
  content: <></>,
  status: "CLOSED",
  location: ToastLocation.topLeft,
  timeToastIsOpenFor: 20,
  closeAnimationDuration: 0.3,
  openAnimationDuration: 0.1
}

export const DEFAULT_TOAST_CONTAINER: ToastContainer = {
  toasts: [],
  location: ToastLocation.topLeft,
  timeToastIsOpenFor: 20,
  closeAnimationDuration: 0.3,
  openAnimationDuration: 0.1,
  multipleToasts: false
}

export { DEFAULT_STYLE, DEFAULT_TOAST_VALUES }