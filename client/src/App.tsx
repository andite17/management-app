import { BrowserRouter as Router,Route, Routes } from 'react-router-dom'
import Login from './pages/auth/login/Login'
import PrivateRoutes from './lib/PrivateRoutes'
import Register from './pages/auth/register/Register'
import Member from './pages/member/Member'

function App() {

  return (
    <>
      <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Member/>} path=''/>
            </Route>
            <Route element={<Login/>} path="/login"/>
            <Route element={<Register/>} path="/register"/>
          </Routes>
      </Router>
    </>
  )
}

export default App
