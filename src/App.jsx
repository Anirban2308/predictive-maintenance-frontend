import React from 'react'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Signup from './pages/Auth/Signup'
import Login from './pages/Auth/Login'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import Appointments from './pages/Appointments'
import Analytics from './pages/Analytics'
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/home' element={<Home/>}/>
         <Route path='/dashboard' element={<Dashboard/>}/>
         <Route path='/navbar' element={<Navbar/>}/>
         <Route path='/appointments'element={<Appointments/>}/>
         <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  )
}

export default App