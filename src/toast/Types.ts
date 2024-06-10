interface ToastInterface {
  content: ContentType,
  status: StatusType,
  location: LocationType,
  timeToastIsOpenFor: number,
  openAnimationDuration: number,
  closeAnimationDuration: number
}

interface ActionInterface {
  type: ActionType,
  content?: ContentType,
  location?: LocationType,
  timeToastIsOpenFor?: number,
  openAnimationDuration?: number,
  closeAnimationDuration?: number
}

interface LocationInterface {
  bottomCenter: BC,
  bottomLeft: BL,
  bottomRight: BR,
  topCenter: TC,
  topLeft: TL,
  topRight: TR,
  update: (location: LocationType) => void
}

interface iStyle {
  color?: string,
  fontFamily?: string,
  fontStyle?: string,
  fontSize?: string | number,
  fontWeight?: string | number
}

type BC = "BOTTOM-CENTER"
type BL = "BOTTOM-LEFT"
type BR = "BOTTOM-RIGHT"
type TC = "TOP-CENTER"
type TL = "TOP-LEFT"
type TR = "TOP-RIGHT"
type FontStyleType = "normal" | "italic" | "oblique"
type LocationType = TL | BL | TR | BR | TC | BC
type ContentType = JSX.Element
type StatusType = "CLOSED" | "OPEN" | "INITIATE CLOSE"
type ActionType = "open" | "close" | "close complete" | "update location" | "update animation durations"

export type { ToastInterface, LocationType, ContentType, StatusType, ActionInterface, ActionType, LocationInterface, iStyle, FontStyleType }
