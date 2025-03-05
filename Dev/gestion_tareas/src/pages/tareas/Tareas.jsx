import "./Tareas.scss";
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import traerTareas from "./../../methods/traerTareas";

function Tarea() {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        setTareas(traerTareas());
    }, []);
    return (
        <div className="contenedor">
            <span />
            <h2>Tareas</h2>

            {tareas.map((tareasCompletos, indexCompleto) => (
                <div key={indexCompleto}>
                    <p className="subtitulo">{tareasCompletos.titulo}</p>
                    {tareasCompletos.tareas.length == 0 &&
                        <p className="margen">No hay tareas disponibles</p>
                    }
                    <div className="tareas">
                        {tareasCompletos.tareas.map((tarea, index) => (
                            <div>
                                <div key={index} className="contenedor_tarea_largo">
                                    <div className="nombre_fecha">
                                        <p>{tarea.titulo}</p>
                                        <p>{tarea.fecha}</p>
                                    </div>
                                    <p>Descripción: {tarea.descripcion}</p>
                                </div>
                                <div className="botones">
                                    <button className="editar">
                                        <NavLink to={`/tareas/editar/${index}`} className="enlace_editar">Editar</NavLink>
                                    </button>
                                    <button className="eliminar">Eliminar</button>
                                    <button className="completar">✓</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <button className="boton_agregar"><NavLink className="enlace" to="/tareas/crear">+</NavLink></button>
        </div>
    );
}

export default Tarea;