import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useToast from './toast/useToast'
import { useState } from 'react'

function App() {
  const [Toast, open, Location] = useToast()
  const [popupText, setPopupText] = useState("app open test")

  return (
    <>
      <Toast/>
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
      <br/>
      <div>
        <button onClick={() => open(<>{popupText}</>)}>Open Pop-up</button>
      </div>
    </>
  )
}

export default App
