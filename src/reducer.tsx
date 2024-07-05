import { Action, ActionTypes, ToastContainer, ToastValues } from "./Types";

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
        toasts: values.multipleToasts ? [ ...values.toasts, createNew(action.content!) ] : [ createNew(action.content!) ]
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
    case ActionTypes.setLocation: {
      return {
        ...values,
        location: action.location!
      }
    }
    case ActionTypes.setAnimationDurations: {
      return {
        ...values,
        timeToastIsOpenFor: action.timeToastIsOpenFor!,
        openAnimationDuration: action.openAnimationDuration!,
        closeAnimationDuration: action.closeAnimationDuration!
      }
    }
    case ActionTypes.setMultipleToasts: {{
      return {
        ...values,
        multipleToasts: action.multipleToasts!
      }
    }}
    default: {
      return values
    }
  }
}

function createNew(content: ToastValues["content"]) {
  return {
    content: content,
    open: true,
    id: Date.now().toString(36) + Math.random().toString(36).substring(2)
  }
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
