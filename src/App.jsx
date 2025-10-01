import MainPage from "./pages/MainPage"
import "./styles/style.scss"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import Test from "./Test"
import Loading from "./ui/Loading"

const App = () => {
  return (
    <div className="app">



      <Routes>
        <Route path="/dashboard" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/test" element={<Loading />} />
      </Routes>


    </div>
  )
}

export default App