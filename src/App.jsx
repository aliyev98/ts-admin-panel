import MainPage from "./pages/MainPage"
import Test from '../src/Test'
import "./styles/style.scss"
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"

const App = () => {
  return (
    <div className="app">



      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>


    </div>
  )
}

export default App