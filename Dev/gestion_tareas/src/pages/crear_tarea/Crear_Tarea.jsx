import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import "./Crear_Tarea.scss";
import crearTarea from "./../../methods/crearTarea";
import traerProyectos from '../../methods/traerProyectos';

function Crear_Tarea() {
    const [proyectosPendientes, setProyectosPendientes] = useState([]);
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        fecha: '',
        proyectoID: ''
    });
    const navigate = useNavigate();
    useEffect(() => {
        const proyectos = traerProyectos();
        setProyectosPendientes(proyectos.find(proyecto => proyecto.titulo === 'Proyectos Pendientes').proyectos);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        crearTarea(
            {
                titulo: formData.titulo,
                descripcion: formData.descripcion,
                fecha: formData.fecha,
                proyectoID: formData.proyectoID
            }
        )
        navigate('/tareas');
        
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
                        value={formData.proyectoID}
                        onChange={(e) => setFormData({...formData, proyectoID: e.target.value})}
                    >
                    {proyectosPendientes.map((proyecto, index) => (
                        <option key={index} value={proyecto.id}>{proyecto.titulo}</option>
                    ))}
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