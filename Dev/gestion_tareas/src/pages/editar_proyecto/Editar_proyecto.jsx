import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Proyectos.scss';

function Editar_proyecto() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        titulo: '',
        fecha: '',
        descripcion: '',
    });

    // Simular carga de datos de la tarea
    useEffect(() => {
        const proyectoEjemplo = {
            titulo: "Predeterminado",
            descripcion: "Proyecto ...",
            fecha: "2023-10-10",           
        };
        setFormData(proyectoEjemplo);
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para guardar cambios
        console.log("Proyecto actualizado:", formData);
    };
    return (
        <div className="contenedor-formulario">
            <span/>
            <header className="header-edicion">
                <h2>Editar proyecto</h2>
            </header>

            <form onSubmit={handleSubmit} className="formulario-edicion">
                <div className="campo-formulario">
                    <label>Título</label>
                    <input
                        type="text"
                        value={formData.titulo}
                        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    />
                </div>

                <div className="campo-formulario">
                    <label>Fecha</label>
                    <input
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                    />
                </div>

                <div className="campo-formulario">
                    <label>Descripción</label>
                    <textarea
                        value={formData.descripcion}
                        onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                    />
                </div>

                <div className="botones-accion">
                    <NavLink to="/tareas" className="boton-cancelar">Cancelar</NavLink>
                    <button type="submit" className="boton-guardar">Guardar cambios</button>
                </div>
            </form>
        </div>
    );
}
export default Editar_proyecto;