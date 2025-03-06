import "./Tareas.scss";
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import eliminarTarea from "../../methods/eliminarTarea";
import completarTarea from "../../methods/completarTarea";
import traerProyectos from "../../methods/traerProyectos";

function Tarea() {
    const [tareas, setTareas] = useState([]);
    const navigate = useNavigate();

    // Obtener tareas reales desde los proyectos
    function cargarTareas() {
        const proyectos = traerProyectos().find(p => p.titulo === "Proyectos Pendientes")?.proyectos || [];
        return proyectos.flatMap(proyecto => 
            proyecto.tareas.map(tarea => ({
                ...tarea,
                proyectoId: proyecto.id,
                fecha: tarea.fecha ? new Date(tarea.fecha) : new Date()
            }))
        );
    }

    useEffect(() => {
        setTareas(cargarTareas());
    }, []);

    // Manejar eliminación
    const handleEliminar = (proyectoId, tareaId) => {
        if (eliminarTarea(proyectoId, tareaId)) {
            setTimeout(() => setTareas(cargarTareas()), 100); // Esperar a que localStorage se actualice
        }
    };

    // Manejar completado
    const handleCompletar = (proyectoId, tareaId) => {
        if (completarTarea(proyectoId, tareaId)) {
            setTimeout(() => setTareas(cargarTareas()), 100);
        }
    };

    return (
        <div className="contenedor">
            <span/>
            <h2>Tareas</h2>
            <p className="subtitulo">Tareas pendientes</p>
            <div className="tareas">
                {tareas.map((tarea) => (
                    <div key={tarea.id}>
                        <div className="contenedor_tarea_largo">
                            <div className="nombre_fecha">
                                <p>{tarea.titulo}</p>
                                <p>{tarea.fecha.toLocaleDateString('es-ES')}</p>
                            </div>
                            <p>Descripción: {tarea.descripcion}</p>
                            <p>Estado: {tarea.estado}</p>
                        </div>
                        <div className="botones">
                            <button className="editar">
                                <NavLink 
                                    to={`/tareas/editar/${tarea.proyectoId}/${tarea.id}`}
                                    className="enlace_editar"
                                >
                                    Editar
                                </NavLink>
                            </button>
                            <button 
                                className="eliminar" 
                                onClick={() => handleEliminar(tarea.proyectoId, tarea.id)}
                            >
                                Eliminar
                            </button>
                            <button 
                                className="completar"
                                onClick={() => handleCompletar(tarea.proyectoId, tarea.id)}
                            >
                                ✓
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="boton_agregar">
                <NavLink className="enlace" to="/tareas/crear">+</NavLink>
            </button>
        </div>
    );
}

export default Tarea;
