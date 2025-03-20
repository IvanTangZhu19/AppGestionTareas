import { StrictMode, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from "react-router"
import './index.css'
import Home from './pages/home/Home.jsx'
import Tareas from './pages/tareas/Tareas.jsx'
import Crear_Tarea from './pages/crear_tarea/Crear_Tarea.jsx'
import Editar_Tarea from './pages/editar_tarea/Editar_tarea.jsx'
import Proyectos from './pages/proyectos/Proyectos.jsx'
import Proyecto from './pages/proyecto/Proyecto.jsx'
import Crear_Proyecto from './pages/crear_proyecto/Crear_proyecto.jsx'
import Editar_Proyecto from './pages/editar_proyecto/Editar_proyecto.jsx'
import Header from './components/header/header.jsx'
import Menu from './components/menu/Menu.jsx'
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'animate.css';
import { node } from 'globals'

function RutasAnimadas(){
  const locacion = useLocation();
  const nodeRef = useRef(null)

  return (
    <TransitionGroup>
      <CSSTransition
        key={locacion.key}
        className="animate__animated animate__fadeIn"
        timeout={300}
        nodeRef={nodeRef}
      >
        <div ref={nodeRef}>
          <Routes location={locacion}>
            <Route path="/" element={<Home />} />
            <Route path="/tareas" element={<Tareas />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/tareas/crear" element={<Crear_Tarea />} />
            <Route path="/proyectos/crear" element={<Crear_Proyecto />} />
            <Route path="/tareas/editar/:proyectoId/:tareaId" element={<Editar_Tarea />} />
            <Route path="/proyectos/editar/:id" element={<Editar_Proyecto />} />
            <Route path="/proyectos/:id" element={<Proyecto />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header/>
    <BrowserRouter>
        <RutasAnimadas />
        <Menu/>
    </BrowserRouter>
  </StrictMode>,
)
