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

type LocationType = "TOP-LEFT" | "BOTTOM-LEFT" | "TOP-RIGHT" | "BOTTOM-RIGHT" | "TOP-CENTER" | "BOTTOM-CENTER"
type ContentType = JSX.Element
type StatusType = "CLOSED" | "OPEN" | "INITIATE CLOSE"
type ActionType = "open" | "close" | "close complete" | "update location"

export type { ToastInterface, LocationType, ContentType, StatusType, ActionInterface, ActionType }
