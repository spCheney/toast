import { ActionInterface, ToastInterface } from "./Types";

function toastReducer(values: ToastInterface, action: ActionInterface): ToastInterface {
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
    case "update location": {
      return {
        ...values,
        location: action.location!
      }
    }
    default: {
      return values
    }
  }
}

export { toastReducer }