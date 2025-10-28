import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Registration from "./page/login/registration"
import Login from "./page/login/login"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Registration />} />
      </Routes>
    </Router>
  )
}

export default App
