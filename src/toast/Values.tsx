var ToastValues: ToastInterface = {
  content: <></>,
  status: "CLOSED",
  location: "TOP-LEFT"
}

interface ToastInterface {
  content: JSX.Element,
  status: "CLOSED" | "OPEN" | "INITIATE CLOSE",
  location: "TOP-LEFT" | "BOTTOM-LEFT"
}

var LocationValue: LocationType = "TOP-LEFT"

type LocationType = "TOP-LEFT" | "BOTTOM-LEFT"

export { ToastValues, LocationValue }
export type { ToastInterface, LocationType }
