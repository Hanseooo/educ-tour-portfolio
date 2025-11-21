import HomePage from "./components/pages/HomePage"
import { Analytics } from "@vercel/analytics/react"


function App() {

  return (
    <>
    <Analytics />
      <div>
        <HomePage />
      </div>
    </>
  )
}

export default App
