var DefaultValues: ToastInterface = {
  content: <></>,
  status: "CLOSED",
  location: "TOP-LEFT"
}

interface ToastInterface {
  content: ContentType,
  status: StatusType,
  location: LocationType
}

type LocationType = "TOP-LEFT" | "BOTTOM-LEFT" | "TOP-RIGHT" | "BOTTOM-RIGHT"
type ContentType = JSX.Element
type StatusType = "CLOSED" | "OPEN" | "INITIATE CLOSE"

export { DefaultValues }
export type { ToastInterface, LocationType, ContentType, StatusType }
