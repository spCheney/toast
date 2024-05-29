interface ToastInterface {
  content: ContentType,
  status: StatusType,
  location: LocationType
}

interface ActionInterface {
  type: ActionType,
  content?: ContentType,
  location?: LocationType
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

type BC = "BOTTOM-CENTER"
type BL = "BOTTOM-LEFT"
type BR = "BOTTOM-RIGHT"
type TC = "TOP-CENTER"
type TL = "TOP-LEFT"
type TR = "TOP-RIGHT"
type LocationType = TL | BL | TR | BR | TC | BC
type ContentType = JSX.Element
type StatusType = "CLOSED" | "OPEN" | "INITIATE CLOSE"
type ActionType = "open" | "close" | "close complete" | "update location"

export type { ToastInterface, LocationType, ContentType, StatusType, ActionInterface, ActionType, LocationInterface }
