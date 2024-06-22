import { Action, ActionTypes, ToastContainer, ToastInterface, ToastValues } from "./Types";

/**
 * updates the values for the toast
 * @param values {@link ToastInterface}
 * @param action {@link Action}
 * @returns updated values
 */
export function toastReducer(values: ToastContainer, action: Action): ToastContainer {
  switch (action.type) {
    case ActionTypes.open: {
      return {
        ...values,
        toasts: addNew(values.toasts, action.content!)
      }
    }
    case ActionTypes.close: {
      return {
        ...values,
        toasts: update(values.toasts, action.toastId!, false)
      }
    }
    case ActionTypes.remove: {
      return {
        ...values,
        toasts: remove(values.toasts, action.toastId!)
      }
    }
    case ActionTypes.updateLocation: {
      return {
        ...values,
        location: action.location!
      }
    }
    case ActionTypes.updateAnimationDurations: {
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

function addNew(toasts: ToastValues[], content: ToastValues["content"]) {
  return [
    ...toasts,
    {
      content: content,
      open: true,
      id: Date.now().toString(36) + Math.random().toString(36).substring(2)
    }
  ]
}

function update(toasts: ToastValues[], id: string, open: boolean) {
  const index = toasts.findIndex(toast => toast.id === id)
  if(index !== -1) {
    toasts[index].open = open
  }

  return toasts
}

function remove(toasts: ToastValues[], id: string) {
  return toasts.filter(toast => toast.id !== id)
}
