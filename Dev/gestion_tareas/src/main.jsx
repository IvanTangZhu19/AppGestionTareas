import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './index.css'
import Home from './pages/home/Home.jsx'
import Tareas from './pages/tareas/Tareas.jsx'
import Crear_Tarea from './pages/crear_tarea/Crear_Tarea.jsx'
import Editar_Tarea from './pages/editar_tarea/Editar_tarea.jsx'
import Proyectos from './pages/proyectos/Proyectos.jsx'
import Crear_Proyecto from './pages/crear_proyecto/Crear_proyecto.jsx'
import Editar_Proyecto from './pages/editar_proyecto/Editar_proyecto.jsx'
import Header from './components/header/header.jsx'
import Menu from './components/menu/Menu.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tareas" element={<Tareas />} />
        <Route path="/proyectos" element={<Proyectos />} />
        <Route path="/tareas/crear" element={<Crear_Tarea />} />
        <Route path="/proyectos/crear" element={<Crear_Proyecto />} />
        <Route path="/tareas/editar" element={<Editar_Tarea />} />
        <Route path="/proyectos/editar" element={<Editar_Proyecto />} />
      </Routes>
    </Router>
    <Menu/>
  </StrictMode>,
)
