import Login from "./components/login"
import { Routes, Route } from "react-router-dom"
import HomeScreen from "./components/homescreen"

const App = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App