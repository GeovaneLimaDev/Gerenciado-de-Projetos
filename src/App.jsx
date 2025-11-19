import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Registration from "./page/login/registration"
import Login from "./page/login/login"
import IndexHome from "./page/home/indexHome"
import { ProjectProvider } from "./hooks/useContext.jsx"
import Config from "./page/config/indexConfig.jsx"

function App() {
  return (
    <Router>
      <ProjectProvider>
          <Routes>
            <Route path="/*" element={<Login />} />
            <Route path="/cadastro" element={<Registration />} />
            <Route path="/home/*" element={<IndexHome />} />
          </Routes>
      </ProjectProvider>
    </Router>
  )
}

export default App
