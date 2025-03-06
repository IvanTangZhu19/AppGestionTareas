import "./Tareas.scss";
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import eliminarTarea from "../../methods/eliminarTarea";
import completarTarea from "../../methods/completarTarea";
import traerTareas from "../../methods/traerTareas";

function Tarea() {
    const [tareas, setTareas] = useState([]);
    const navigate = useNavigate();

    // Obtener tareas reales desde los proyectos
    // function cargarTareas() {
    //     const proyectos = traerProyectos().find(p => p.titulo === "Proyectos Pendientes")?.proyectos || [];
    //     return proyectos.flatMap(proyecto => 
    //         proyecto.tareas.map(tarea => ({
    //             ...tarea,
    //             proyectoId: proyecto.id,
    //             fecha: tarea.fecha ? new Date(tarea.fecha) : new Date()
    //         }))
    //     );
    // }

    useEffect(() => {
        setTareas(traerTareas());
    }, []);

    // Manejar eliminación
    const handleEliminar = (proyectoId, tareaId) => {
        if (eliminarTarea(proyectoId, tareaId)) {
            setTimeout(() => setTareas(traerTareas()), 100); // Esperar a que localStorage se actualice
        }
    };

    // Manejar completado
    const handleCompletar = (proyectoId, tareaId) => {
        if (completarTarea(proyectoId, tareaId)) {
            setTimeout(() => setTareas(traerTareas()), 100);
        }
    };

    return (
        <div className="contenedor">
            <span />
            <h2>Tareas</h2>
            {tareas.map((tareasCompleto, index) => (
                <div key={index}>
                    <p className="subtitulo">{tareasCompleto.titulo}</p>
                    {tareasCompleto.tareas.length == 0 &&
                        <p className="margen">No hay tareas disponibles</p>
                    }
                    <div className="tareas">
                        {tareasCompleto.tareas.map((tarea) => (
                            <div>
                                <div key={tarea.id}>
                                    <div className="contenedor_tarea_largo">
                                        <div className="nombre_fecha">
                                            <p>{tarea.titulo}</p>
                                            <p>{tarea.fecha}</p>
                                        </div>
                                        <p>Descripción: {tarea.descripcion}</p>
                                        <p>Estado: {tarea.estado}</p>
                                    </div>
                                    <div className="botones">
                                        <button className="editar">
                                            <NavLink
                                                to={`/tareas/editar/${tarea.proyectoID}/${tarea.id}`}
                                                className="enlace_editar"
                                            >
                                                Editar
                                            </NavLink>
                                        </button>
                                        <button
                                            className="eliminar"
                                            onClick={() => handleEliminar(tarea.proyectoID, tarea.id)}
                                        >
                                            Eliminar
                                        </button>
                                        {tarea.estado == "activo" &&
                                            <button
                                                className="completar"
                                                onClick={() => handleCompletar(tarea.proyectoID, tarea.id)}
                                            >
                                                ✓
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            <button className="boton_agregar">
                <NavLink className="enlace" to="/tareas/crear">+</NavLink>
            </button>
        </div>
    );
}

export default Tarea;
