var ToastValues: ToastInterface = {
  content: <></>,
  status: "CLOSED",
}

interface ToastInterface {
  content: JSX.Element,
  status: "CLOSED" | "OPEN" | "INITIATE CLOSE",
}

var LocationValue: LocationType = "TOP-LEFT"

type LocationType = "TOP-LEFT" | "BOTTOM-LEFT"

export { ToastValues, LocationValue }
export type { ToastInterface, LocationType }
