import "./Proyectos.scss";
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";

function Proyecto() {
    const [proyectos, setProyectos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setProyectos(traerProyectos());
    }, []);

    const handleEliminar = (index) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este proyecto?");
        if (confirmacion) {
            //const nuevosProyectos = proyectos.filter((_, i) => i !== index);
            //setProyectos(nuevosProyectos);
            navigate("/proyectos");
        }
    };
    return (
        <div className="contenedor_proyectos">
            <span/>
            <h2>Proyectos</h2>
            <p className="subtitulo">Proyectos pendientes</p>
            <div className="proyectos">
                {proyectos.map((proyecto, index) => (
                    <div>
                        <div key={index} className="contenedor_proyecto_largo">
                            <div className="nombre">
                                <p>{proyecto.titulo}</p>
                            </div>
                            <p>Descripción: {proyecto.descripcion}</p>
                            <div>
                                {proyecto.tareas.map((tarea, tareaIndex) => (
                                    <li key={tareaIndex}>{tarea.nombre}</li>
                                ))}
                            </div>
                        </div>
                        <div className="botones_proyectos">
                            <button className="editar">
                                <NavLink to="/proyectos/editar/1" className="enlace_editar">Editar</NavLink>
                            </button>
                            <button className="eliminar" onClick={() => handleEliminar(index)}>Eliminar</button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="boton_agregar"><NavLink className="enlace" to="/proyectos/crear">+</NavLink></button>
        </div>
    );
}

function traerProyectos(){
    const proyectos = [
        {
            "titulo": "Predeterminado",
            "descripcion": "Proyecto ...",
            "tareas": [
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
                }
            ]
        },
    ];
    return proyectos;
}

export default Proyecto;