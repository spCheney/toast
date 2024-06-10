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
    case "update animation durations": {
      return {
        ...values,
        timeToastIsOpenFor: action.timeToastIsOpenFor!,
        openAnimationDuration: action.openAnimationDuration!,
        closeAnimationDuration: action.closeAnimationDuration!
      }
    }
    default: {
      return values
    }
  }
}

export { toastReducer }