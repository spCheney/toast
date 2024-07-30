# Toasty-React


<img src="https://raw.githubusercontent.com/spencercheney/toast/main/demos/quick-demo.gif" height="150" alt="quick zoomed in demo" />
<img src="https://raw.githubusercontent.com/spencercheney/toast/main/demos/auto-close.gif" height="150" alt="auto-close demo" />
<img src="https://raw.githubusercontent.com/spencercheney/toast/main/demos/css-style.gif" height="150" alt="you can set the css style" />


<img src="https://raw.githubusercontent.com/spencercheney/toast/main/demos/location.gif" width="700" alt="demonstrates updating the location" />


Toasty-React allows you to add notifications to your app!

## Installation

```
$ npm install --save toasty-react
$ yarn add toasty-react
```

## Features

- Easy to set up and use
- Can set the CSS styling of the Toast
- The location of the Toast can be set to 6 different locations
- Toast can display a string of text or a React component
- The duration of the toast and any of the animation timing can be changed

## Example

```jsx
import useToast from 'toasty-react'

function App() {
  const [Toast, open] = useToast()

  return(
    <>
      <Toast />
      <button onClick={() => open(<>Text in Toast</>)}>Open Toast</button>
    </>
  )
}
```

## Changing the Location

```jsx
import useToast from 'toasty-react'

function App() {
  const [Toast, open, Location] = useToast()

  return(
    <>
      <Toast />

      <button onClick={() => Location.update(Location.topLeft)}>Top Left</button>
      <button onClick={() => Location.update(Location.bottomLeft)}>Bottom Left</button>
      <button onClick={() => Location.update(Location.topRight)}>Top Right</button>
      <button onClick={() => Location.update(Location.bottomRight)}>Bottom Right</button>
      <button onClick={() => Location.update(Location.topCenter)}>Top Center</button>
      <button onClick={() => Location.update(Location.bottomCenter)}>Bottom Center</button>
      <button onClick={() => open(<>Text in Toast</>)}>Open Toast</button>
    </>
  )
}
```

## Setting CSS Stylings

```jsx
import useToast from 'toasty-react'

function App() {
  const [Toast, open] = useToast()
  const [popupText, setPopupText] = useState("app open test")
  const [fontSize, setFontSize] = useState(16)
  const [color, setColor] = useState("black")
  const [fontStyle, setFontStyle] = useState("normal")
  const [fontWeight, setFontWeight] = useState(400)
  const [fontFamily, setFontFamily] = useState("default")
  const [border, setBorder] = useState("2px solid transparent")
  const [backgroundColor, setBackgroundColor] = useState("#fafafa")

  return(
    <>
      <Toast style={{ color: color, fontFamily: fontFamily, fontStyle: fontStyle, fontWeight: fontWeight, border: border, backgroundColor: backgroundColor }}/>
      <button onClick={() => open(<>Text in Toast</>)}>Open Toast</button>
    </>
  )
}
```