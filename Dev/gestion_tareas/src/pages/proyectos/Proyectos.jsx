import "./Proyectos.scss";
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import traerProyectos from "./../../methods/traerProyectos";
import eliminarProyecto from "../../methods/eliminarProyecto"; 
import completarProyecto from "../../methods/completarProyecto"; 

function Proyecto() {
    const [proyectos, setProyectos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setProyectos(traerProyectos());
    }, []);

    // Eliminar proyecto por ID
    const handleEliminar = (id) => {
        const confirmacion = window.confirm("¿Estás seguro de eliminar este proyecto?");
        if (confirmacion) {
            eliminarProyecto(id);
            setProyectos(traerProyectos()); // Actualizar estado
            navigate("/proyectos");
        }
    };

    // Completar proyecto
    const handleCompletar = (id) => {
        if (completarProyecto(id)) {
            setProyectos(traerProyectos()); // Actualizar estado
        }
    };

    return (
        <div className="contenedor_proyectos">
            <span />
            <h2>Proyectos</h2>
            {proyectos.map((proyectoCompletos, index) => (
                <div key={index}>
                    <p className="subtitulo">{proyectoCompletos.titulo}</p>
                    {proyectoCompletos.proyectos.length === 0 && 
                        <p className="margen">No hay proyectos disponibles</p>
                    }
                    <div className="proyectos">
                        {proyectoCompletos.proyectos.map((proyecto) => (
                            <section key={proyecto.id}>
                                <div className="contenedor_proyecto_largo">
                                    <div className="nombre">
                                        <p>{proyecto.titulo}</p>
                                        <p>{proyecto.fecha}</p>
                                    </div>
                                    <p>Descripción: {proyecto.descripcion}</p>
                                    <div>
                                        {proyecto.tareas.map((tarea) => (
                                            <li key={tarea.id}>
                                                {tarea.titulo} {tarea.fecha} 
                                                {tarea.estado == "completado" &&
                                                    <span>✓</span>
                                                }
                                            </li>
                                        ))}
                                    </div>
                                </div>
                                <div className="botones_proyectos">
                                    <button className="editar">
                                        {/* Enlace con ID real */}
                                        <NavLink 
                                            to={`/proyectos/editar/${proyecto.id}`} 
                                            className="enlace_editar"
                                        >
                                            Editar
                                        </NavLink>
                                    </button>
                                    <button 
                                        className="eliminar" 
                                        onClick={() => handleEliminar(proyecto.id)}
                                    >
                                        Eliminar
                                    </button>
                                    <button 
                                        className="completar"
                                        onClick={() => handleCompletar(proyecto.id)}
                                    >
                                        ✓
                                    </button>
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            ))}
            <button className="boton_agregar">
                <NavLink className="enlace" to="/proyectos/crear">+</NavLink>
            </button>
        </div>
    );
}

export default Proyecto;