import { ToastInterface } from "./Values";

function toastReducer(values: ToastInterface, action: ActionType): ToastInterface {
  switch (action.type) {
    case "open": {
      return {
        ...values,
        content: action.content!,
        status: "OPEN"
      }
    }
    case "close": {
      return {
        ...values,
        status: "INITIATE CLOSE"
      }
    }
    case "close complete": {
      return {
        ...values,
        content: <></>,
        status: "CLOSED"
      }
    }
    default: {
      return values
    }
  }
}

interface ActionType {
  type: "open" | "close" | "close complete" | "update location",
  content?: JSX.Element,
}

export { toastReducer }
export type { ActionType }