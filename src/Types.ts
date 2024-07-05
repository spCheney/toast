import { updateStatus } from "./Hooks"

/**
 * used to set the styling of the container of the toasts
 * @property location - where the toasts will be located on the screen
 * @property timeToastIsOpenFor - how long the toast will be open until the toast automatically closes
 * @property openAnimationDuration - how long the open animation will last
 * @property closeAnimationDuration - how long the close animation will last
 * @property multipleToasts - what happens in the open dispatch function (if true an additional toast will be added if not it will delete the existing toast before adding a new one)
 */
interface ContainerValues {
  location: ToastLocation,
  timeToastIsOpenFor: number,
  openAnimationDuration: number,
  closeAnimationDuration: number,
  multipleToasts: boolean
}

/**
 * all the information that is needed by the container
 * extends the values in {@link ContainerValues} and an array of the toasts it will contain
 */
export interface ToastContainer extends ContainerValues {
  toasts: ToastValues[],
}

/**
 * used for each individual toast
 * @property id - used to identifed each individual toast
 * @property content - what will be displayed by the toast
 * @property open - determines whether the open or close animation is used
 */
export interface ToastValues {
  id: string,
  content: Content,
  open: boolean
}

/**
 * contains the type of action for the reducer and optional values to be updated
 */
export interface Action extends Partial<ContainerValues> {
  type: ActionTypes,
  content?: Content,
  toastId?: string
}

/** adds an update function to the {@link ToastLocation} enum */
export interface LocationInterface extends Record<keyof typeof ToastLocation, ToastLocation> {
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
export interface Style {
  color: string,
  fontFamily: string,
  fontStyle: string,
  fontSize: string | number,
  fontWeight: string | number
}

/**
 * used by the {@link updateStatus} hook to control the timeouts for the animations and then automically remove the toast
 */
export interface Timeout {
  toastId: string,
  isToastOpen: boolean,
  timeout: number,
}

/** used for the content of each toast */
export type Content = JSX.Element

/**
 * where the popup will be located on the screen
 * @property bottomCenter
 * @property bottomLeft
 * @property bottomRight
 * @property topCenter
 * @property topLeft
 * @property topRight
 */
  export enum ToastLocation {
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
 * @property setLocation
 * @property setAnimationDurations
 * @property setMultipleToasts
 */
export const enum ActionTypes {
  open = "open",
  close = "close",
  remove = "remove",
  setLocation = "set location",
  setAnimationDurations = "set animation durations",
  setMultipleToasts = "set multiple toasts"
}
