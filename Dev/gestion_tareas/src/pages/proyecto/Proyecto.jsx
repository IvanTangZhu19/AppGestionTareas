import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import iconoEdit from "./../../assets/edit.svg"
import iconoDelete from "./../../assets/delete.svg"
import traerProyectoPorID from "./../../methods/traerProyectoPorID"
import eliminarTarea from "../../methods/eliminarTarea";
import completarTarea from "../../methods/completarTarea";

function Proyecto() {
    const { id } = useParams();
    const [proyecto, setProyecto] = useState({
        titulo: '',
        fecha: '',
        descripcion: '',
        color: '#ffffff',
        tareas: []
    });
    const navigate = useNavigate();

    useEffect(() => {
        const proyecto = traerProyectoPorID(parseInt(id));
        setProyecto({
            titulo: proyecto.titulo,
            fecha: proyecto.fecha,
            descripcion: proyecto.descripcion,
            color: proyecto.color,
            tareas: proyecto.tareas
        });
    }, [id]);

    const handleEliminar = (proyectoId, tareaId) => {
        const confirmacion = window.confirm("¿Estás seguro de eliminar esta tarea?");
        if (confirmacion) {
          if (eliminarTarea(proyectoId, tareaId)) {
            // Actualizar listado tras eliminar
            setTimeout(() => setProyecto(traerProyectoPorID(parseInt(id))), 100);
          }
        }
      };
    
      // Manejar completado
      const handleCompletar = (proyectoId, tareaId) => {
        if (completarTarea(proyectoId, tareaId)) {
          // Actualizar listado tras completar
          setTimeout(() => setProyecto(traerProyectoPorID(parseInt(id))), 100);
        }
      };
    return (
        <div className="contenedor">
            <span />
            <h2>Proyectos</h2>
            <div className="subtitulo_boton">
                <p className="subtitulo">Titulo: {proyecto.titulo}</p>
                <p>{proyecto.fecha}</p>
            </div>
            <p className='margen'>Descripción: {proyecto.descripcion}</p>
            {proyecto.tareas.length == 0 &&
                <p className="margen">No hay tareas disponibles</p>
            }
            <p className='margen'>Tareas: </p>
            <div className="tareas">
                {proyecto.tareas.map((tarea) => (
                    <div>
                        <div key={tarea.id}>
                            <div className="contenedor_tarea_largo"
                                style={{ backgroundColor: proyecto.color }}
                            >
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
                                        to={`/tareas/editar/${id}/${tarea.id}`}
                                        className="enlace_editar"
                                    >
                                        <img src={iconoEdit} alt="" />
                                    </NavLink>
                                </button>
                                <button
                                    className="eliminar"
                                    onClick={() => handleEliminar(id, tarea.id)}
                                >
                                    <img src={iconoDelete} alt="" />
                                </button>
                                {tarea.estado == "activo" &&
                                    <button
                                        className="completar"
                                        onClick={() => handleCompletar(id, tarea.id)}
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
    );
}

export default Proyecto;