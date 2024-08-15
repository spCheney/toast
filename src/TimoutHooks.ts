import { useState, useEffect } from "react"
import { ToastValues, Timeout, Action, ActionTypes, ToastStatus } from "./Types"

/**
 * @param createTimeout a function that creates a timeout for a given toast
 * @param setTimeouts the setter from use state used to remove the timeout
 * @returns a function that clears and updates the timeout when it's corresponding toast's status changes
 */
export function useUpdateTimeouts(createTimeout: (toast: ToastValues) => Timeout, setTimeouts: React.Dispatch<React.SetStateAction<Timeout[]>>) {
  const [updateTimeouts, setUpdateTimeouts] = useState<(toast: ToastValues, timeout: NodeJS.Timeout, index: number) => void>(() => {})

  useEffect(() => {
    setUpdateTimeouts(() =>
      (toast: ToastValues, timeout: NodeJS.Timeout, index: number) => {
        clearTimeout(timeout)
        var newTimeout = createTimeout(toast)

        setTimeouts(prevState => {
          prevState[index] = newTimeout
          return prevState
        })
      }
    )
  }, [createTimeout, setTimeouts])

  return updateTimeouts
}

/**
 * createTimeout function updates the status of a toast to maintain CSS styling across animation
 * @param remove removes the toast and the timeout
 * @param dispatch used to update the status of a timeout
 * @param openAnimationDuration how long the open animation lasts
 * @param timeToastIsOpenFor how long the toast is open after open animation finishes and close animation starts
 * @param closeAnimationDuration how long the close animation lasts
 * @returns a function used to create a timeout object
 */
export function useCreateTimeout(remove: (toastId: string) => void, dispatch: React.Dispatch<Action>, openAnimationDuration: number, timeToastIsOpenFor: number, closeAnimationDuration: number) {
  const [createTimeout, useCreateTimeout] = useState<(toast: ToastValues) => Timeout>(() => { return {} as Timeout })

  useEffect(() => {
    useCreateTimeout(() =>
        (toast: ToastValues) => {
          if(toast.status === ToastStatus.created) {
            return newTimeout(toast, () => dispatch({ type: ActionTypes.update, toastId: toast.id, status: ToastStatus.open }), openAnimationDuration)
          } else if(toast.status === ToastStatus.open) {
            return newTimeout(toast, () => dispatch({ type: ActionTypes.update, toastId: toast.id, status: ToastStatus.closed }), timeToastIsOpenFor)
          } else {
            return newTimeout(toast, () => remove(toast.id), closeAnimationDuration)
          }
        }
    )
  }, [dispatch, openAnimationDuration, timeToastIsOpenFor, closeAnimationDuration, remove])

  return createTimeout
}

/**
 * removes t(oast) and t(imeout)
 * @param setTimeouts the setter from use state used to remove the timeout
 * @param dispatch used to remove the toast
 * @returns a function used to remove a toast and it's corresponding timeout
 */
export function useRemoveTT(setTimeouts: React.Dispatch<React.SetStateAction<Timeout[]>>, dispatch: React.Dispatch<Action>) {
  const [removeTT, setRemoveTT] = useState<(toastId: string) => void>(() => {})

  useEffect(() => {
    setRemoveTT(() =>
      (toastId: string) => {
        dispatch({ type: ActionTypes.remove, toastId: toastId })
        setTimeouts(prevState => prevState.filter(timeout => timeout.toastId !== toastId))
      }
    )
  }, [setTimeouts, dispatch])

  return removeTT
}

function newTimeout(toast: ToastValues, runnable: () => void, seconds: number) {
  return {
    toastId: toast.id,
    toastStatus: toast.status,
    timeout: setTimeout(runnable, seconds * 1000)
  }
}
