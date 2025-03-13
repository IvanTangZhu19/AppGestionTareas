import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import editarProyecto from '../../methods/editarProyecto';
import './Editar_proyecto.scss'; // Importa el SCSS específico

function Editar_proyecto() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    titulo: '',
    fecha: '',
    descripcion: '',
    color: '#ffffff',
    tareas: []
  });
  const [error, setError] = useState('');

  // Estado para la nueva tarea a agregar
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    fecha: '',
    descripcion: ''
  });

  // Cargar datos reales del proyecto
  useEffect(() => {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const proyecto = proyectos.find(p => p.id === parseInt(id));
    if (proyecto) {
      setFormData({
        titulo: proyecto.titulo,
        descripcion: proyecto.descripcion,
        fecha: proyecto.fecha?.split('T')[0] || '',
        color: proyecto.color || '#ffffff',
        tareas: proyecto.tareas || []
      });
    }
  }, [id]);

  // Guardar cambios
  const handleSubmit = (e) => {
    e.preventDefault();
    const hoy = new Date();
    const fechaProyecto = new Date(formData.fecha);

    if (fechaProyecto <= hoy) {
      setError("La fecha debe ser mayor al día de hoy");
      return;
    }
    if (editarProyecto(id, formData)) {
      window.location.href = "/proyectos"; // Redirigir
    }
  };

  // Agregar nueva tarea
  const handleAgregarTarea = () => {
    if (!nuevaTarea.titulo) return; // Se requiere al menos un título
    const nuevaTareaConId = {
      ...nuevaTarea,
      id: Date.now(),
      estado: 'activo'
    };
    setFormData({
      ...formData,
      tareas: [...formData.tareas, nuevaTareaConId]
    });
    // Limpiar campos de la nueva tarea
    setNuevaTarea({ titulo: '', fecha: '', descripcion: '' });
  };

  // Eliminar tarea de la lista
  const handleEliminarTarea = (idTarea) => {
    setFormData({
      ...formData,
      tareas: formData.tareas.filter(t => t.id !== idTarea)
    });
  };

  return (
    <div className="edit-project-container">
      <header className="header-edicion">
        <h2>Editar proyecto</h2>
      </header>

      <form onSubmit={handleSubmit} className="edit-project-form">
        {/* Grupo: Título */}
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            id="titulo"
            type="text"
            value={formData.titulo}
            onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
            placeholder="Ingresa el título del proyecto"
          />
        </div>

        {/* Grupo: Fecha */}
        <div className="form-group">
          <label htmlFor="fecha">Fecha</label>
          <input
            id="fecha"
            type="date"
            value={formData.fecha}
            onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
          />
        </div>

        {/* Grupo: Descripción */}
        <div className="form-group">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            value={formData.descripcion}
            onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
            placeholder="Ingresa la descripción del proyecto"
          />
        </div>

        {/* Grupo: Color */}
        <div className="form-group">
          <label htmlFor="color">Color del Proyecto</label>
          <input
            id="color"
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          />
        </div>

        {/* Sección: Listado de Tareas */}
        <div className="tasks-section">
          <h3>Tareas</h3>
          {formData.tareas.length > 0 ? (
            <ul className="tasks-list">
              {formData.tareas.map((tarea) => (
                <li key={tarea.id} className="task-item">
                  <div className="task-info">
                    <p className="task-title">{tarea.titulo}</p>
                    {tarea.fecha && <p className="task-date">{tarea.fecha}</p>}
                    {tarea.descripcion && <p className="task-desc">{tarea.descripcion}</p>}
                  </div>
                  <button
                    type="button"
                    className="btn-delete-task"
                    onClick={() => handleEliminarTarea(tarea.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="no-tasks-msg">No hay tareas añadidas</p>
          )}
        </div>

        {/* Sección: Agregar nueva tarea */}
        <div className="add-task-section">
          <h4>Agregar Nueva Tarea</h4>
          <div className="form-group">
            <label htmlFor="task-title">Título</label>
            <input
              id="task-title"
              type="text"
              placeholder="Título de la tarea"
              value={nuevaTarea.titulo}
              onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-date">Fecha</label>
            <input
              id="task-date"
              type="date"
              value={nuevaTarea.fecha}
              onChange={(e) => setNuevaTarea({ ...nuevaTarea, fecha: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="task-desc">Descripción</label>
            <textarea
              id="task-desc"
              placeholder="Descripción de la tarea"
              value={nuevaTarea.descripcion}
              onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
            />
          </div>
          <button type="button" className="btn-add-task" onClick={handleAgregarTarea}>
            Agregar Tarea
          </button>
        </div>

        {/* Mensaje de error si existe */}
        {error && <p className="error-msg">{error}</p>}

        {/* Botones de acción */}
        <div className="action-buttons">
          <NavLink to="/proyectos" className="btn-cancel">
            Cancelar
          </NavLink>
          <button type="submit" className="btn-save">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}

export default Editar_proyecto;
