/**
 * the values of the toast that are updated through the reducer
 * @property content
 * @property status
 * @property location
 * @property timeToastIsOpenFor
 * @property openAnimationDuration
 * @property closeAnimationDuration
 */
interface ToastInterface {
  content: ContentType,
  status: StatusType,
  location: ToastLocation,
  timeToastIsOpenFor: number,
  openAnimationDuration: number,
  closeAnimationDuration: number
}

export interface ToastContainer {
  toasts: ToastValues[],
  location: ToastLocation,
  timeToastIsOpenFor: number,
  openAnimationDuration: number,
  closeAnimationDuration: number
}

export interface ToastValues {
  id: string,
  content: ContentType,
  open: boolean
}

/**
 * contains the type of action for the reducer and optional values to be updated
 */
interface Action extends Partial<ToastInterface> {
  type: ActionTypes,
  toastId?: string,
}

/** adds an update function to the {@link ToastLocation} enum */
interface LocationInterface extends Record<keyof typeof ToastLocation, ToastLocation> {
  update: (location: ToastLocation) => void
}

/**
 * specifies the style for the toast popups
 * @property color
 * @property fontFamily
 * @property fontStyle
 * @property fontSize
 * @property fontWeight
 */
interface iStyle {
  color: string,
  fontFamily: string,
  fontStyle: string,
  fontSize: string | number,
  fontWeight: string | number
}

export interface Timeout {
  toastId: string,
  isToastOpen: boolean,
  timeout: number,
}

type FontStyleType = "normal" | "italic" | "oblique"
type ContentType = JSX.Element
type StatusType = "CLOSED" | "OPEN" | "INITIATE CLOSE"

/**
 * where the popup will be located on the screen
 * @property bottomCenter
 * @property bottomLeft
 * @property bottomRight
 * @property topCenter
 * @property topLeft
 * @property topRight
 */
  enum ToastLocation {
  bottomCenter = "BOTTOM-CENTER",
  bottomLeft = "BOTTOM-LEFT",
  bottomRight = "BOTTOM-RIGHT",
  topCenter = "TOP-CENTER",
  topLeft = "TOP-LEFT",
  topRight = "TOP-RIGHT"
}

/**
 * the possible actions of the reducer
 * @property open
 * @property close
 * @property closeComplete
 * @property updateLocation
 * @property updateAnimationDurations
 */
const enum ActionTypes {
  open = "open",
  close = "close",
  remove = "remove",
  updateLocation = "update location",
  updateAnimationDurations = "update animation durations"
}

export type { ToastInterface, ContentType, StatusType, Action, LocationInterface, iStyle, FontStyleType }
export { ToastLocation, ActionTypes }
