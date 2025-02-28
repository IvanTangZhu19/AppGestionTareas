import React, { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './Tareas.scss';

function Editar_Tarea() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        titulo: '',
        fecha: '',
        descripcion: '',
        proyecto: 'Predeterminado'
    });

    // Simular carga de datos de la tarea
    useEffect(() => {
        const tareaEjemplo = {
            titulo: "Tarea de cálculo",
            descripcion: "Resolver ejercicios 1-3 del libro...",
            fecha: "2023-10-10",
            proyecto: "Predeterminado"
        };
        setFormData(tareaEjemplo);
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para guardar cambios
        console.log("Tarea actualizada:", formData);
    };

    return (
        <div className="contenedor-formulario">
            <span/>
            <header className="header-edicion">
                <h2>Editar tarea</h2>
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

                <div className="campo-formulario">
                    <label>Proyecto</label>
                    <select
                        value={formData.proyecto}
                        onChange={(e) => setFormData({...formData, proyecto: e.target.value})}
                    >
                        <option value="Predeterminado">Predeterminado</option>
                        <option value="Matemáticas">Matemáticas</option>
                        <option value="Ciencias">Ciencias</option>
                    </select>
                </div>

                <div className="botones-accion">
                    <NavLink to="/tareas" className="boton-cancelar">Cancelar</NavLink>
                    <button type="submit" className="boton-guardar">Guardar cambios</button>
                </div>
            </form>
        </div>
    );
}

export default Editar_Tarea;