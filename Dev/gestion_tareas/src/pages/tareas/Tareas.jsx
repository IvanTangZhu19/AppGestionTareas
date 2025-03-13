import "./Tareas.scss";
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import eliminarTarea from "../../methods/eliminarTarea";
import completarTarea from "../../methods/completarTarea";
import traerTareas from "../../methods/traerTareas";

function Tarea() {
  const [tareas, setTareas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setTareas(traerTareas());
  }, []);

  // Función para obtener el color del proyecto
  const getProjectColor = (projectId) => {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const proyecto = proyectos.find(p => p.id === projectId);
    return proyecto ? proyecto.color : '#fff'; // Valor por defecto si no se encuentra
  };

  // Manejar eliminación
  const handleEliminar = (proyectoId, tareaId) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta tarea?");
    if (confirmacion) {
      if (eliminarTarea(proyectoId, tareaId)) {
        // Actualizar listado tras eliminar
        setTimeout(() => setTareas(traerTareas()), 100);
      }
    }
  };

  // Manejar completado
  const handleCompletar = (proyectoId, tareaId) => {
    if (completarTarea(proyectoId, tareaId)) {
      // Actualizar listado tras completar
      setTimeout(() => setTareas(traerTareas()), 100);
    }
  };

  return (
    <div className="contenedor">
      <span />
      <h2>Tareas</h2>

      {/* Este .map asume que "tareas" retorna un array de objetos tipo
          { titulo: 'Tareas Pendientes', tareas: [ { ...}, { ...} ] }
          o algo similar. Ajusta según tu estructura. */}
      {tareas.map((tareasGrupo, index) => (
        <div key={index}>
          <p className="subtitulo">{tareasGrupo.titulo}</p>
          {tareasGrupo.tareas.length === 0 && (
            <p className="margen">No hay tareas disponibles</p>
          )}
          <div className="tareas">
            {tareasGrupo.tareas.map((tarea) => (
              <div key={tarea.id}>
                {/* Aplicas el color del proyecto en cada tarea */}
                <div
                  className="contenedor_tarea_largo"
                  style={{ backgroundColor: getProjectColor(tarea.proyectoID) }}
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
                  {tarea.estado === "activo" && (
                    <button
                      className="completar"
                      onClick={() => handleCompletar(tarea.proyectoID, tarea.id)}
                    >
                      ✓
                    </button>
                  )}
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
