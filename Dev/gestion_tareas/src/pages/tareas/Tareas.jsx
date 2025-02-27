import "./Tareas.scss";
import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

function Tarea() {
    const [tareas, setTareas] = useState([]);
    
    useEffect(() => {
        setTareas(traerTareas());
    }, []);
    return (
        <div className="contenedor">
            <span/>
            <h2>Tareas</h2>
            <p className="subtitulo">Tareas pendientes</p>
            <div className="tareas">
                {tareas.map((tarea, index) => (
                    <div>
                        <div key={index} className="contenedor_tarea_largo">
                            <div className="nombre_fecha">
                                <p>{tarea.nombre}</p>
                                <p>{tarea.fecha.toLocaleDateString('es-ES')}</p>
                            </div>
                            <p>{tarea.descripcion}</p>
                        </div>
                        <div className="botones">
                            <button className="editar">
                                <NavLink to="/tareas/editar/:id" className="enlace_editar">Editar</NavLink>
                                
                            </button>
                            <button>Eliminar</button>
                            <button className="completar">Completar</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="boton_agregar"><NavLink className="enlace" to="/tareas/crear">+</NavLink></button>
        </div>
    );
}

function traerTareas(){
    const tareas = [
        {
            "nombre": "Tarea de cálculo",
            "descripcion": "Descripcion de la tarea de cálculo que consiste en resolver ejercicios 1,2,3 del libro ...",
            "estado": "pendiente",
            "fecha": new Date("2021-10-10")
        },
        {
            "nombre": "Tarea de astronomía",
            "descripcion": "Descripcion de la tarea 1",
            "estado": "pendiente",
            "fecha": new Date("2021-10-10")
        },
        {
            "nombre": "Tarea de astronomía",
            "descripcion": "Descripcion de la tarea 1",
            "estado": "pendiente",
            "fecha": new Date("2021-10-10")
        },
        {
            "nombre": "Tarea de astronomía",
            "descripcion": "Descripcion de la tarea 1",
            "estado": "pendiente",
            "fecha": new Date("2021-10-10")
        }
    ];
    return tareas;
}

export default Tarea;