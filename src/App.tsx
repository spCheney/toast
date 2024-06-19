import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useToast from './toast/useToast'
import { useState } from 'react'

function App() {
  const [Toast, open, Location] = useToast()
  const [popupText, setPopupText] = useState("app open test")
  const [fontSize, setFontSize] = useState(16)
  const [color, setColor] = useState("black")
  const [fontStyle, setFontStyle] = useState("normal")
  const [fontWeight, setFontWeight] = useState(400)
  const [fontFamily, setFontFamily] = useState("default")

  return (
    <>
      <Toast style={{ color: color, fontFamily: fontFamily, fontStyle: fontStyle }}/>
      <div>
        <button onClick={() => Location.update(Location.topLeft)}>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </button>
        <button onClick={() => Location.update(Location.bottomLeft)}>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </button>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => open(<>{popupText}</>)}>
          count is {0}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <input type="text" style={{ width: "100%", marginBottom: "10px" }} onChange={e => setPopupText(e.currentTarget.value)}  placeholder={popupText}/>
      <div>
        <button onClick={() => Location.update(Location.topLeft)}>Top Left</button>
        <button onClick={() => Location.update(Location.bottomLeft)}>Bottom Left</button>
        <button onClick={() => Location.update(Location.topRight)}>Top Right</button>
        <button onClick={() => Location.update(Location.bottomRight)}>Bottom Right</button>
        <button onClick={() => Location.update(Location.topCenter)}>Top Center</button>
        <button onClick={() => Location.update(Location.bottomCenter)}>Bottom Center</button>
      </div>
      <div>
        <label style={{marginRight: 5}}>Font Size:</label>
        <input type="number" value={ fontSize } onChange={e => setFontSize(parseInt(e.currentTarget.value))} style={{ width: 40, marginRight: 5 }} />
        <label style={{marginRight: 5}}>Color:</label>
        <select value={color} onChange={e => setColor(e.currentTarget.value)} style={{marginRight: 5 }}>
          <option>black</option>
          <option>red</option>
          <option>blue</option>
          <option>green</option>
        </select>
        <label style={{marginRight: 5}}>Font Style:</label>
        <select value={fontStyle} onChange={e => setFontStyle(e.currentTarget.value)} style={{marginRight: 5 }}>
          <option>italic</option>
          <option>normal</option>
          <option>oblique</option>
        </select>
        <label style={{marginRight: 5}}>Font Weight:</label>
        <input type="number" value={ fontWeight } onChange={e => setFontWeight(parseInt(e.currentTarget.value))} style={{ width: 40, marginRight: 5 }} />
        <label style={{marginRight: 5}}>Font Family:</label>
        <select value={fontFamily} onChange={e => setFontFamily(e.currentTarget.value)} style={{marginRight: 5 }}>
          <option>"Times New Roman", Times, serif</option>
          <option>Arial, Helvetica, sans-serif</option>
          <option>'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif</option>
          <option>default</option>
        </select>
      </div>
      <br/>
      <div>
        <button onClick={() => open(<>{popupText}</>)}>Open Pop-up</button>
      </div>
    </>
  )
}

export default App
