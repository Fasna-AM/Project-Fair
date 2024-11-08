
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import { useContext } from 'react'
import { tokenAuthContext } from './context/AuthContextAPI'

function App() {
 const {isAutherised,setIsAutherised} = useContext(tokenAuthContext)
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={isAutherised? <Dashboard/> : <Navigate to={'/login'}/>}/>
      <Route path='/projects' element={isAutherised? <Projects/> : <Navigate to={'/login'}/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth insideRegister={true} />}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
