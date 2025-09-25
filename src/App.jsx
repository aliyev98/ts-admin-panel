import MainPage from "./pages/MainPage"
import Test from '../src/Test'
import "./styles/style.scss"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"

const App = () => {
  return (
    <div className="app">



      <Routes>
        <Route path="/dashboard" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>


    </div>
  )
}

export default App