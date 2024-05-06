import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useToast from './toast/useToast'

function App() {
  const [Toast, open, updateLocation] = useToast()

  return (
    <>
      <Toast/>
      <div>
        <button onClick={() => updateLocation("TOP-LEFT")}>
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </button>
        <button onClick={() => updateLocation("BOTTOM-LEFT")}>
          <img src={reactLogo} className="logo react" alt="React logo" />
        </button>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => open(<>app open test</>)}>
          count is {0}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <button onClick={() => updateLocation("TOP-LEFT")}>Top Left</button>
        <button onClick={() => updateLocation("BOTTOM-LEFT")}>Bottom Left</button>
      </div>
      <br/>
      <div>
        <button onClick={() => open(<>app open test</>)}>Open Pop-up</button>
      </div>
    </>
  )
}

export default App
