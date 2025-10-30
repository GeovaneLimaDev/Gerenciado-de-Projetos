import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Registration from "./page/login/registration"
import Login from "./page/login/login"
import IndexHome from "./page/home/indexHome"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/cadastro" element={<Registration />} />
        <Route path="/home/*" element={<IndexHome />} />
      </Routes>
    </Router>
  )
}

export default App
