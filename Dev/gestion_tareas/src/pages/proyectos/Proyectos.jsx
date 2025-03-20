import "./Proyectos.scss";
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import traerProyectos from "./../../methods/traerProyectos";
import eliminarProyecto from "../../methods/eliminarProyecto";
import completarProyecto from "../../methods/completarProyecto";
import iconoEdit from "./../../assets/edit.svg"
import iconoDelete from "./../../assets/delete.svg"
import iconoVer from "./../../assets/ver.svg"

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
      setProyectos(traerProyectos());
      navigate("/proyectos");
    }
  };

  // Completar proyecto
  const handleCompletar = (id) => {
    if (completarProyecto(id)) {
      setProyectos(traerProyectos());
    }
  };

    return (
        <div className="contenedor_proyectos">
            <span />
            <h2>Proyectos</h2>
            {proyectos.map((proyectoCompletos, index) => (
                <div key={index}>
                    <div className="subtitulo_boton">
                        <p className="subtitulo">{proyectoCompletos.titulo}</p>
                        {proyectoCompletos.titulo == "Proyectos Pendientes" &&
                            <button className="boton_agregar">
                                <NavLink className="enlace" to="/proyectos/crear">+</NavLink>
                            </button>
                        }
                    </div>
                    {proyectoCompletos.proyectos.length === 0 &&
                        <p className="margen">No hay proyectos disponibles</p>
                    }
                    <div className="proyectos">
                        {proyectoCompletos.proyectos.map((proyecto) => (
                            <section key={proyecto.id}>
                                <div className="contenedor_proyecto_largo"
                                    style={{ backgroundColor: proyecto.color || '#fff' }}
                                >
                                    <div className="nombre">
                                        <p>{proyecto.titulo}</p>
                                        <p>{proyecto.fecha}</p>
                                    </div>
                                    <p>Descripción: {proyecto.descripcion}</p>
                                    <p>Tareas: </p>
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
                                            <img src={iconoEdit} alt="" />
                                        </NavLink>
                                    </button>
                                    <button className="eliminar">
                                        {/* Enlace con ID real */}
                                        <NavLink
                                            to={`/proyectos/${proyecto.id}`}
                                            className="enlace_editar"
                                        >
                                            <img src={iconoVer} alt="" />
                                        </NavLink>
                                    </button>
                                    <button
                                        className="eliminar"
                                        onClick={() => handleEliminar(proyecto.id)}
                                    >
                                        <img src={iconoDelete} alt="" />
                                    </button>
                                    {proyecto.estado != "completado" &&
                                        <button
                                            className="completar"
                                            onClick={() => handleCompletar(proyecto.id)}
                                        >
                                            ✓
                                        </button>
                                    }
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Proyecto;
