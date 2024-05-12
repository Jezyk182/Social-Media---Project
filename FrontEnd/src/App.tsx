import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Contact from "./components/Contact"
import { Routes, Route } from "react-router-dom"
import SignUp from "./components/SignUp/SignUp"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="*" element={<h1>ERROR 404</h1>}/>
      </Routes>
    </>
  )
}

export default App
