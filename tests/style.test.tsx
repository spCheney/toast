import { useReducer } from "react"
import { DEFAULT_STYLE, DEFAULT_TOAST_CONTAINER } from "../src/DefaultValues"
import { getAnimationVariables, getContainerStyle, getCSSClasses, getLocationCSS, getToastStyle, populateStyle, updateAnimationDurations } from "../src/StyleFunctions"
import { CssStyle, ToastLocation } from "../src/Types"
import { toastReducer } from "../src/reducer";

describe("getting the location class", () => {
  test("passing an undefined prop", () => {
    const css = getLocationCSS("asdf" as ToastLocation)
    expect(css).toEqual("topLeft")
  })

  test("top left", () => {
    const css = getLocationCSS(ToastLocation.topLeft)
    expect(css).toEqual("topLeft")
  })

  test("bottom left", () => {
    const css = getLocationCSS(ToastLocation.bottomLeft)
    expect(css).toEqual("bottomLeft")
  })

  test("top right", () => {
    const css = getLocationCSS(ToastLocation.topRight)
    expect(css).toEqual("topRight")
  })

  test("bottom right", () => {
    const css = getLocationCSS(ToastLocation.bottomRight)
    expect(css).toEqual("bottomRight")
  })

  test("top center", () => {
    const css = getLocationCSS(ToastLocation.topCenter)
    expect(css).toEqual("topCenter")
  })

  test("bottom center", () => {
    const css = getLocationCSS(ToastLocation.bottomCenter)
    expect(css).toEqual("bottomCenter")
  })
})

describe.each([true, false])("get class for toast", (open) => {
  test(`classes when open is ${open}`, () => {
    var css = getCSSClasses(open, ToastLocation.topLeft)
    expect(css).toMatch(/(toast)/i)
    if(open) {
      expect(css).not.toMatch(/(close)/i)
    } else {
      expect(css).toMatch(/(close)/i)
    }
  })

  test("left", () => {
    var css = getCSSClasses(open, ToastLocation.topLeft)
    expect(css).toMatch(/(openLeft)/i)
    css = getCSSClasses(open, ToastLocation.bottomLeft)
    expect(css).toMatch(/(openLeft)/i)
  })

  test("right", () => {
    var css = getCSSClasses(open, ToastLocation.topRight)
    expect(css).toMatch(/(openRight)/i)
    css = getCSSClasses(open, ToastLocation.bottomRight)
    expect(css).toMatch(/(openRight)/i)
  })

  test("top", () => {
    var css = getCSSClasses(open, ToastLocation.topCenter)
    expect(css).toMatch(/(openTop)/i)
  })

  test("bottom", () => {
    var css = getCSSClasses(open, ToastLocation.bottomCenter)
    expect(css).toMatch(/(openBottom)/i)
  })
})

describe("populating inline style values", () => {
  test("not passing any values", () => {
    const style = populateStyle()
    expect(style).toEqual(DEFAULT_STYLE)
  })

  test("color", () => {
    const style = populateStyle({ color: "red" })
    expect(style.color).not.toEqual(DEFAULT_STYLE.color)
    expect(style.backgroundColor).toEqual(DEFAULT_STYLE.backgroundColor)
    expect(style.border).toEqual(DEFAULT_STYLE.border)
    expect(style.fontFamily).toEqual(DEFAULT_STYLE.fontFamily)
    expect(style.fontSize).toEqual(DEFAULT_STYLE.fontSize)
    expect(style.fontStyle).toEqual(DEFAULT_STYLE.fontStyle)
    expect(style.fontWeight).toEqual(DEFAULT_STYLE.fontWeight)
    expect(style.color).toEqual("red")
  })

  test("backgroundColor", () => {
    const style = populateStyle({ backgroundColor: "red" })
    expect(style.color).toEqual(DEFAULT_STYLE.color)
    expect(style.backgroundColor).not.toEqual(DEFAULT_STYLE.backgroundColor)
    expect(style.border).toEqual(DEFAULT_STYLE.border)
    expect(style.fontFamily).toEqual(DEFAULT_STYLE.fontFamily)
    expect(style.fontSize).toEqual(DEFAULT_STYLE.fontSize)
    expect(style.fontStyle).toEqual(DEFAULT_STYLE.fontStyle)
    expect(style.fontWeight).toEqual(DEFAULT_STYLE.fontWeight)
    expect(style.backgroundColor).toEqual("red")
  })

  test("border", () => {
    const style = populateStyle({ border: "1px solid red" })
    expect(style.color).toEqual(DEFAULT_STYLE.color)
    expect(style.backgroundColor).toEqual(DEFAULT_STYLE.backgroundColor)
    expect(style.border).not.toEqual(DEFAULT_STYLE.border)
    expect(style.fontFamily).toEqual(DEFAULT_STYLE.fontFamily)
    expect(style.fontSize).toEqual(DEFAULT_STYLE.fontSize)
    expect(style.fontStyle).toEqual(DEFAULT_STYLE.fontStyle)
    expect(style.fontWeight).toEqual(DEFAULT_STYLE.fontWeight)
    expect(style.border).toEqual("1px solid red")
  })

  test("fontFamily", () => {
    const style = populateStyle({ fontFamily: "times new roman" })
    expect(style.color).toEqual(DEFAULT_STYLE.color)
    expect(style.backgroundColor).toEqual(DEFAULT_STYLE.backgroundColor)
    expect(style.border).toEqual(DEFAULT_STYLE.border)
    expect(style.fontFamily).not.toEqual(DEFAULT_STYLE.fontFamily)
    expect(style.fontSize).toEqual(DEFAULT_STYLE.fontSize)
    expect(style.fontStyle).toEqual(DEFAULT_STYLE.fontStyle)
    expect(style.fontWeight).toEqual(DEFAULT_STYLE.fontWeight)
    expect(style.fontFamily).toEqual("times new roman")
  })

  test("fontSize", () => {
    const style = populateStyle({ fontSize: "200px" })
    expect(style.color).toEqual(DEFAULT_STYLE.color)
    expect(style.backgroundColor).toEqual(DEFAULT_STYLE.backgroundColor)
    expect(style.border).toEqual(DEFAULT_STYLE.border)
    expect(style.fontFamily).toEqual(DEFAULT_STYLE.fontFamily)
    expect(style.fontSize).not.toEqual(DEFAULT_STYLE.fontSize)
    expect(style.fontStyle).toEqual(DEFAULT_STYLE.fontStyle)
    expect(style.fontWeight).toEqual(DEFAULT_STYLE.fontWeight)
    expect(style.fontSize).toEqual("200px")
  })

  test("fontStyle", () => {
    const style = populateStyle({ fontStyle: "italics" })
    expect(style.color).toEqual(DEFAULT_STYLE.color)
    expect(style.backgroundColor).toEqual(DEFAULT_STYLE.backgroundColor)
    expect(style.border).toEqual(DEFAULT_STYLE.border)
    expect(style.fontFamily).toEqual(DEFAULT_STYLE.fontFamily)
    expect(style.fontSize).toEqual(DEFAULT_STYLE.fontSize)
    expect(style.fontStyle).not.toEqual(DEFAULT_STYLE.fontStyle)
    expect(style.fontWeight).toEqual(DEFAULT_STYLE.fontWeight)
    expect(style.fontStyle).toEqual("italics")
  })

  test("fontWeight", () => {
    const style = populateStyle({ fontWeight: 800 })
    expect(style.color).toEqual(DEFAULT_STYLE.color)
    expect(style.backgroundColor).toEqual(DEFAULT_STYLE.backgroundColor)
    expect(style.border).toEqual(DEFAULT_STYLE.border)
    expect(style.fontFamily).toEqual(DEFAULT_STYLE.fontFamily)
    expect(style.fontSize).toEqual(DEFAULT_STYLE.fontSize)
    expect(style.fontStyle).toEqual(DEFAULT_STYLE.fontStyle)
    expect(style.fontWeight).not.toEqual(DEFAULT_STYLE.fontWeight)
    expect(style.fontWeight).toEqual(800)
  })
})

describe("get inline styles for the container of the toasts", () => {
  test("empty object", () => {
    const container  = getContainerStyle({} as CssStyle)
    expect(container.color).toEqual(DEFAULT_STYLE.color)
    expect(container.fontFamily).toEqual(DEFAULT_STYLE.fontFamily)
    expect(container.fontSize).toEqual(DEFAULT_STYLE.fontSize)
    expect(container.fontStyle).toEqual(DEFAULT_STYLE.fontStyle)
    expect(container.fontWeight).toEqual(DEFAULT_STYLE.fontWeight)
  })

  test("default", () => {
    const container = getContainerStyle(DEFAULT_STYLE)
    expect(container.color).toEqual(DEFAULT_STYLE.color)
    expect(container.fontFamily).toEqual(DEFAULT_STYLE.fontFamily)
    expect(container.fontSize).toEqual(DEFAULT_STYLE.fontSize)
    expect(container.fontStyle).toEqual(DEFAULT_STYLE.fontStyle)
    expect(container.fontWeight).toEqual(DEFAULT_STYLE.fontWeight)
  })

  test("custom values", () => {
    const container =  getContainerStyle({
      color: "red",
      fontFamily: "times new roman",
      fontSize: "30px",
      fontStyle: "italics",
      fontWeight: 100,
      border: "1px solid black",
      backgroundColor: "asdff"
    })
    expect(container.color).toEqual("red")
    expect(container.fontFamily).toEqual("times new roman")
    expect(container.fontSize).toEqual("30px")
    expect(container.fontStyle).toEqual("italics")
    expect(container.fontWeight).toEqual(100)
  })
})

describe("get inline styles for toast", () => {
  test("empty object", () => {
    const container  = getToastStyle({} as CssStyle)
    expect(container.border).toEqual(DEFAULT_STYLE.border)
    expect(container.backgroundColor).toEqual(DEFAULT_STYLE.backgroundColor)
  })

  test("default", () => {
    const container = getToastStyle(DEFAULT_STYLE)
    expect(container.border).toEqual(DEFAULT_STYLE.border)
    expect(container.backgroundColor).toEqual(DEFAULT_STYLE.backgroundColor)
  })

  test("custom values", () => {
    const container =  getToastStyle({
      color: "red",
      fontFamily: "times new roman",
      fontSize: "30px",
      fontStyle: "italics",
      fontWeight: 100,
      border: "1px solid black",
      backgroundColor: "asdff"
    })
    expect(container.border).toEqual("1px solid black")
    expect(container.backgroundColor).toEqual("asdff")
  })
})
