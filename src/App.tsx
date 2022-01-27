import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import GlobalStyle from './styles/global'
import AuthProvider from './context/auth'
import Profile from './pages/Profile'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute redirectTo="/">
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute redirectTo="/">
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
        <GlobalStyle />
      </AuthProvider>
    </>
  )
}

export default App
