import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./Proyectos.scss";
function Crear_Proyecto() {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        fecha: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para guardar el proyecto (usar localStorage o API)
        console.log("Proyecto creado:", formData);
    };
    return (
        <div className="contenedor-formulario">
            <span/>
            <h2>Crear proyecto</h2>
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

                <div className="botones-formulario">
                    <NavLink to="/proyectos" className="cancelar">Cancelar</NavLink>
                    <button type="submit">Crear</button>
                </div>
            </form>
        </div>
    );
}

export default Crear_Proyecto;