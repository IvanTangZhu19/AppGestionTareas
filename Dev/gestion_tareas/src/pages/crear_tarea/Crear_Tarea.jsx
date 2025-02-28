import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./Tareas.scss";

function Crear_Tarea() {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        fecha: '',
        proyecto: 'Predeterminado'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para guardar la tarea (usar localStorage o API)
        console.log("Tarea creada:", formData);
    };

    return (
        <div className="contenedor-formulario">
            <span/>
            <h2>Crear tarea</h2>
            <form onSubmit={handleSubmit}>
                <div className="campo-formulario">
                    <label>Título</label>
                    <input 
                        type="text" 
                        value={formData.titulo}
                        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                        required
                    />
                </div>

                <div className="campo-formulario">
                    <label>Fecha</label>
                    <input 
                        type="date" 
                        value={formData.fecha}
                        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                        required
                    />
                </div>

                <div className="campo-formulario">
                    <label>Descripción</label>
                    <textarea 
                        value={formData.descripcion}
                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                        required
                    />
                </div>

                <div className="campo-formulario">
                    <label>Proyecto</label>
                    <select 
                        value={formData.proyecto}
                        onChange={(e) => setFormData({...formData, proyecto: e.target.value})}
                    >
                        <option value="Predeterminado">Predeterminado</option>
                        {/* Agregar más proyectos dinámicamente */}
                    </select>
                </div>

                <div className="botones-formulario">
                    <NavLink to="/tareas" className="cancelar">Cancelar</NavLink>
                    <button type="submit">Crear</button>
                </div>
            </form>
        </div>
    );
}

export default Crear_Tarea;