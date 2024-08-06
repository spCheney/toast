import React from "react";
import { toastReducer } from "../src/reducer";
import { Action, ActionTypes, Content, ToastContainer, ToastLocation } from "../src/Types";
import { DEFAULT_TOAST_CONTAINER } from "../src/DefaultValues"

describe("toast reducer", () => {
  test('return the initial state', () => {
    expect(toastReducer(DEFAULT_TOAST_CONTAINER, {} as Action)).toEqual(DEFAULT_TOAST_CONTAINER)
  })
})

describe("creating toasts/open type", () => {
  test("create a toast", () => {
    const values = openToast(<>test</>, DEFAULT_TOAST_CONTAINER)
    expect(values.toasts.length).toEqual(1)
    expect(values.toasts[0].content).toEqual(<>test</>)
  })

  test("remove existing toast when adding another", () => {
    var values = openToast(<>test 1</>, DEFAULT_TOAST_CONTAINER)
    expect(values.toasts.length).toEqual(1)
    expect(values.toasts[0].content).toEqual(<>test 1</>)

    values = openToast(<>test 2</>, values)
    expect(values.toasts.length).toEqual(1)
    expect(values.toasts[0].content).toEqual(<>test 2</>)
  })

  test.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])("append a toast until it reaches %i", (num) => {
    var values = DEFAULT_TOAST_CONTAINER
    values.numOfToasts = num
    for(var i = 0; i < num; i++) {
      values = openToast(<>test {i + 1}</>, values)
      expect(values.toasts.length).toEqual(i + 1)
      expect(values.toasts[i].content).toEqual(<>test {i + 1}</>)
    }

    values = openToast(<>too many toasts</>, values)
    expect(values.toasts.length).toEqual(num)
    if(num > 1) {
      expect(values.toasts[0].content).toEqual(<>test {2}</>)
    }
    expect(values.toasts[values.toasts.length - 1].content).toEqual(<>too many toasts</>)
  })

  test("not providing a content value", () => {
    var values = openToast(undefined, DEFAULT_TOAST_CONTAINER)
    expect(values.toasts.length).toEqual(0)
  })

  test("stringify toasts", () => {
    var content = <p>used for test</p>
    const values = openToast(content, DEFAULT_TOAST_CONTAINER)
    expect(values.toasts.length).toEqual(1)
    expect(values.toasts[0].content).toEqual(<p>used for test</p>)
    expect(JSON.stringify(values.toasts[0].content)).toEqual(JSON.stringify(content))
  })
})

describe("close a toast/set open parameter to false", () => {
  test("when toast array is empty", () => {
    const values = closeToast("test id", DEFAULT_TOAST_CONTAINER)
    expect(values.toasts).toEqual(DEFAULT_TOAST_CONTAINER.toasts)
  })

  test("when a toast with the provided toast id doesn't exist", () => {
    var values = openToast(<>toast</>, DEFAULT_TOAST_CONTAINER)
    values = closeToast("toast id doesn't exist", values)
    expect(values.toasts[0].open).toBeTruthy()
  })

  test("toasts array doesn't change when no toast id is provided", () => {
    var values1 = openToast(<>toast</>, DEFAULT_TOAST_CONTAINER)
    var values2 = closeToast(undefined, values1)
    expect(values2.toasts).toEqual(values1.toasts)
  })

  test("toast open is set to false when it's toast id is provided", () =>  {
    var values = openToast(<>toast</>, DEFAULT_TOAST_CONTAINER)
    values = closeToast(values.toasts[0].id, values)
    expect(values.toasts[0].open).toBeFalsy()
  })
})

describe("remove a toast", () => {
  test("when toast array is empty", () => {
    const values = removeToast("test id", DEFAULT_TOAST_CONTAINER)
    expect(values.toasts).toEqual(DEFAULT_TOAST_CONTAINER.toasts)
  })

  test("when a toast with the provided toast id doesn't exist", () => {
    var values = openToast(<>toast</>, DEFAULT_TOAST_CONTAINER)
    values = removeToast("toast id doesn't exist", values)
    expect(values.toasts[0].open).toBeTruthy()
  })

  test("toasts array doesn't change when no toast id is provided", () => {
    var values1 = openToast(<>toast</>, DEFAULT_TOAST_CONTAINER)
    var values2 = removeToast(undefined, values1)
    expect(values2.toasts).toEqual(values1.toasts)
  })

  test("toast open is set to false when it's toast id is provided", () =>  {
    var values = openToast(<>toast</>, DEFAULT_TOAST_CONTAINER)
    values = removeToast(values.toasts[0].id, values)
    expect(values.toasts.length).toEqual(0)
  })
})

describe("update the location of the toasts", () => {
  test("location won't update if new location isn't provided", () => {
    var values = updateLocataion(undefined, DEFAULT_TOAST_CONTAINER)
    expect(values.location).toEqual(DEFAULT_TOAST_CONTAINER.location)
  })

  test("location won't update if new location isn't valid", () => {
    var values = updateLocataion("asdfasdf" as ToastLocation, DEFAULT_TOAST_CONTAINER)
    expect(values.location).toEqual(DEFAULT_TOAST_CONTAINER.location)
  })

  test("location is updated", () => {
    var values = updateLocataion(ToastLocation.bottomCenter, DEFAULT_TOAST_CONTAINER)
    expect(values.location).not.toEqual(DEFAULT_TOAST_CONTAINER.location)
    expect(values.location).toEqual(ToastLocation.bottomCenter)
  })
})

describe("updating animation values", () => {
  test("no values are updated if they're undefined", () => {
    var values =  setAnimationDurations(undefined, undefined, undefined, DEFAULT_TOAST_CONTAINER)
    expect(values.timeToastIsOpenFor).toEqual(DEFAULT_TOAST_CONTAINER.timeToastIsOpenFor)
    expect(values.openAnimationDuration).toEqual(DEFAULT_TOAST_CONTAINER.openAnimationDuration)
    expect(values.closeAnimationDuration).toEqual(DEFAULT_TOAST_CONTAINER.closeAnimationDuration)
  })

  test("timeToastIsOpenFor is updated", () => {
    var values = setAnimationDurations(100, undefined, undefined, DEFAULT_TOAST_CONTAINER)
    expect(values.timeToastIsOpenFor).not.toEqual(DEFAULT_TOAST_CONTAINER.timeToastIsOpenFor)
    expect(values.timeToastIsOpenFor).toEqual(100)
  })

  test("openAnimationDuration is updated", () => {
    var values = setAnimationDurations(undefined, 100, undefined, DEFAULT_TOAST_CONTAINER)
    expect(values.openAnimationDuration).not.toEqual(DEFAULT_TOAST_CONTAINER.openAnimationDuration)
    expect(values.openAnimationDuration).toEqual(100)
  })

  test("closeAnimationDuration is updated", () => {
    var values = setAnimationDurations(undefined, undefined, 100, DEFAULT_TOAST_CONTAINER)
    expect(values.closeAnimationDuration).not.toEqual(DEFAULT_TOAST_CONTAINER.closeAnimationDuration)
    expect(values.closeAnimationDuration).toEqual(100)
  })

  test("all values are updated", () => {
    var values = setAnimationDurations(100, 200, 300, DEFAULT_TOAST_CONTAINER)
    expect(values.timeToastIsOpenFor).not.toEqual(DEFAULT_TOAST_CONTAINER.timeToastIsOpenFor)
    expect(values.timeToastIsOpenFor).toEqual(100)
    expect(values.openAnimationDuration).not.toEqual(DEFAULT_TOAST_CONTAINER.openAnimationDuration)
    expect(values.openAnimationDuration).toEqual(200)
    expect(values.closeAnimationDuration).not.toEqual(DEFAULT_TOAST_CONTAINER.closeAnimationDuration)
    expect(values.closeAnimationDuration).toEqual(300)
  })
})

describe("updating the number of toasts", () => {
  test("the number of toasts won't update if a value isn't provided", () => {
    var values = setNumOfToasts(undefined, DEFAULT_TOAST_CONTAINER)
    expect(values.numOfToasts).toEqual(DEFAULT_TOAST_CONTAINER.numOfToasts)
  })

  test("the number of toasts updates to the provided values", () => {
    var values = setNumOfToasts(5, DEFAULT_TOAST_CONTAINER)
    expect(values.numOfToasts).toEqual(5)
  })
})

function openToast(content: Content | undefined, values: ToastContainer) {
  const addAction: Action = {
    type: ActionTypes.open,
    content: content
  }

  return toastReducer(values, addAction)
}

function closeToast(toastId: string | undefined, values: ToastContainer) {
  const closeAction: Action = {
    type: ActionTypes.close,
    toastId: toastId
  }

  return toastReducer(values, closeAction)
}

function removeToast(toastId: string | undefined, values: ToastContainer) {
  const closeAction: Action = {
    type: ActionTypes.remove,
    toastId: toastId
  }

  return toastReducer(values, closeAction)
}

function updateLocataion(toastLocation: ToastLocation | undefined, values: ToastContainer) {
  const locationAction: Action = {
    type: ActionTypes.setLocation,
    location: toastLocation
  }

  return toastReducer(values, locationAction)
}

function setAnimationDurations(timeToastIsOpenFor: number | undefined, openAnimationDuration: number | undefined, closeAnimationDuration: number | undefined, values: ToastContainer) {
  const animationAction: Action = {
    type: ActionTypes.setAnimationDurations,
    timeToastIsOpenFor: timeToastIsOpenFor,
    openAnimationDuration: openAnimationDuration,
    closeAnimationDuration: closeAnimationDuration
  }

  return toastReducer(values, animationAction)
}

function setNumOfToasts(num: number | undefined, values: ToastContainer) {
  const numOfToastsAction: Action = {
    type: ActionTypes.setNumOfToasts,
    numOfToasts: num
  }

  return toastReducer(values, numOfToastsAction)
}
