import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from "react-router-dom";
import iconoEdit from "./../../assets/edit.svg"
import iconoDelete from "./../../assets/delete.svg"
import traerProyectoPorID from "./../../methods/traerProyectoPorID"
import esColorNegro from "./../../methods/esColorNegro"
import "./Botones_proyecto.scss";
import { handleEliminarTarea, handleEliminarProyecto, handleCompletarTarea, handleCompletarProyecto } from "./handles";

function Proyecto() {
    const { id } = useParams();
    const [proyecto, setProyecto] = useState({
        titulo: '',
        fecha: '',
        descripcion: '',
        color: '#ffffff',
        tareas: [],
        estado: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const proyecto = traerProyectoPorID(parseInt(id));
        setProyecto({
            titulo: proyecto.titulo,
            fecha: proyecto.fecha,
            descripcion: proyecto.descripcion,
            color: proyecto.color,
            tareas: proyecto.tareas,
            estado: proyecto.estado
        });
    }, [id]);

    function colorTexto(color) {
        return esColorNegro(color) ? '#fff' : '#000';
    };

    return (
        <div className="contenedor">
            <span />
            <h2>Proyectos</h2>
            <div className="subtitulo_boton">
                <p className="subtitulo">Titulo: {proyecto.titulo}</p>
            </div>
            <p className='margen'>Fecha: {proyecto.fecha}</p>
            <p className='margen ancho_descripcion'>Descripción: {proyecto.descripcion}</p>
            <p className='margen'>Estado: {proyecto.estado}</p>
            {proyecto.tareas.length == 0 &&
                <p className="margen">No hay tareas disponibles</p>
            }
            <p className='margen'>Acciones: </p>
            <div className='botones_proyecto_individual'>
                <button>
                    <NavLink
                        to={`/proyectos/editar/${id}`}
                        className="enlace_editar"
                    >
                        Editar
                    </NavLink>
                </button>
                <button onClick={() => handleEliminarProyecto(id, navigate)}>
                    Eliminar
                </button>
                <button onClick={() => handleCompletarProyecto(id, setProyecto)}>
                    Completar
                </button>
            </div>
            <p className='margen'>Tareas: </p>
            <div className="tareas">
                {proyecto.tareas.map((tarea) => (
                    <div>
                        <div key={tarea.id}>
                            <div className="contenedor_tarea_largo"
                                style={{
                                    backgroundColor: proyecto.color,
                                    color: colorTexto(proyecto.color)
                                }}
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
                                    onClick={() => handleEliminarTarea(id, tarea.id)}
                                >
                                    <img src={iconoDelete} alt="" />
                                </button>
                                {tarea.estado == "activo" &&
                                    <button
                                        className="completar"
                                        onClick={() => handleCompletarTarea(id, tarea.id)}
                                    >
                                        ✓
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <span className="margin_bottom"/>
        </div>
    );
}

export default Proyecto;