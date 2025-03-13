import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import './../crear_proyecto/Crear_proyecto.scss';
import editarProyecto from '../../methods/editarProyecto'; // Importar método

function Editar_proyecto() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        titulo: '',
        fecha: '',
        descripcion: '',
    });
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    // Cargar datos reales del proyecto
    useEffect(() => {
        const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
        const proyecto = proyectos.find(p => p.id === parseInt(id));
        if (proyecto) {
            setFormData({
                titulo: proyecto.titulo,
                descripcion: proyecto.descripcion,
                fecha: proyecto.fecha?.split('T')[0] || '' // Formatear fecha para input
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const hoy = new Date();
        const fecha = new Date(formData.fecha);

        if(fecha <= hoy){
            setError("La fecha debe ser mayor al día de hoy");
            return;
        }
        if (editarProyecto(id, formData)) { // Usar el método de edición
            navigate('/proyectos');
        }
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
                {error.length > 0 && 
                    <p>{error}</p>
                }
                <div className="botones-accion">
                    <NavLink to="/proyectos" className="boton-cancelar">Cancelar</NavLink>
                    <button type="submit" className="boton-guardar">Guardar cambios</button>
                </div>
            </form>
        </div>
    );
}
export default Editar_proyecto;