import { Action, ActionTypes, Content, ToastContainer, ToastLocation, ToastStatus, ToastValues } from "./Types";

/**
 * updates the values for the toast
 * @param values {@link ToastInterface}
 * @param action {@link Action}
 * @returns updated values
 */
export function toastReducer(values: ToastContainer, action: Action): ToastContainer {
  switch (action.type) {
    case ActionTypes.open: {
      if(action.content === undefined) {
        console.warn("A toast won't be added without a content value")
        return values
      } else {
        return {
          ...values,
          toasts: addToast(values, action.content)
        }
      }
    }
    case ActionTypes.update: {
      if(action.toastId === undefined || action.status === undefined) {
        console.warn("Toasts won't be changed or updated without toastId and staatus being provided")
        return values
      } else if(values.toasts.length === 0) {
        console.warn("Toasts array is empty")
        return values
      } else if(!values.toasts.some(toast => toast.id === action.toastId)) {
        console.warn("Toasts array doesn't contain \"" + action.toastId + "\" toast id")
        return values
      } else {
        return {
          ...values,
          toasts: update(values.toasts, action.toastId, action.status)
        }
      }
    }
    case ActionTypes.remove: {
      if(action.toastId === undefined) {
        console.warn("Toasts won't be changed or updated without toastId being provided")
        return values
      } else if(values.toasts.length === 0) {
        console.warn("Toasts array is empty")
        return values
      } else if(!values.toasts.some(toast => toast.id === action.toastId)) {
        console.warn("Toasts array doesn't contain \"" + action.toastId + "\" toast id")
        return values
      } else {
        return {
          ...values,
          toasts: remove(values.toasts, action.toastId!)
        }
      }
    }
    case ActionTypes.setLocation: {
      if(action.location === undefined) {
        console.warn("Location won't be changed or updated without new location being provided")
        return values
      } else if(!Object.values(ToastLocation).includes(action.location)) {
        console.warn("The provide location is invalid. The existing value won't be updated")
        return values
      } else {
        return {
          ...values,
          location: action.location!
        }
      }
    }
    case ActionTypes.setAnimationDurations: {
      const timeToastIsOpenFor = action.timeToastIsOpenFor === undefined ? values.timeToastIsOpenFor : action.timeToastIsOpenFor
      const openAnimationDuration = action.openAnimationDuration === undefined ? values.openAnimationDuration : action.openAnimationDuration
      const closeAnimationDuration = action.closeAnimationDuration === undefined ? values.closeAnimationDuration : action.closeAnimationDuration

      return {
        ...values,
        timeToastIsOpenFor: timeToastIsOpenFor,
        openAnimationDuration: openAnimationDuration,
        closeAnimationDuration: closeAnimationDuration
      }
    }
    case ActionTypes.setNumOfToasts: {
      if(action.numOfToasts === undefined) {
        console.warn("The number of toasts won't be changed or updated without new value being provided")
        return values
      } else {
        return {
          ...values,
          numOfToasts: action.numOfToasts
        }
      }
    }
    default: {
      return values
    }
  }
}

function addToast(values: ToastContainer, content: React.JSX.Element) {
  const newToast = createNew(content)
  if(values.numOfToasts <= values.toasts.length) {
    const toasts = values.toasts.slice(values.toasts.length - values.numOfToasts + 1)
    return [ ...toasts, newToast ]
  } else {
    return [ ...values.toasts, newToast ]
  }
}

function createNew(content: Content) : ToastValues {
  return {
    content: content,
    id: Date.now().toString(36) + Math.random().toString(36).substring(2),
    status: ToastStatus.created
  }
}

function update(toasts: ToastValues[], id: string, status: ToastStatus) {
  const index = toasts.findIndex(toast => toast.id === id)
  if(index !== -1) {
    toasts[index].status = status
  }

  return toasts
}

function remove(toasts: ToastValues[], id: string) {
  return toasts.filter(toast => toast.id !== id)
}
