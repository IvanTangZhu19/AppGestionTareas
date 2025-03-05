import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom'; // Añadir useNavigate
import './../crear_tarea/Crear_tarea.scss';
import editarTarea from '../../methods/editarTarea';

function Editar_Tarea() {
    const { proyectoId, tareaId } = useParams();
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [formData, setFormData] = useState({ titulo: '', fecha: '', descripcion: '', proyecto: '' });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const proyectosData = JSON.parse(localStorage.getItem('proyectos')) || [];
        const proyecto = proyectosData.find(p => p.id === Number(proyectoId)); // ID debe ser 2
    
        if (!proyecto) {
            setError('Proyecto no encontrado');
            setCargando(false);
            return;
        }
    
        const tarea = proyecto.tareas?.find(t => t.id === Number(tareaId));
        
        if (!tarea) {
            setError('Tarea no encontrada');
            setCargando(false);
            return;
        }

        setFormData({
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            fecha: tarea.fecha?.split('T')[0] || '',
            proyecto: proyecto.id.toString() // Asegurar que sea string para el select
        });
        
        setCargando(false);
    }, [proyectoId, tareaId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editarTarea(proyectoId, tareaId, formData)) {
            navigate('/tareas'); // Usar navigate en lugar de window.location
        }
    };

    // Mostrar estados de carga/error
    if (cargando) return <div>Cargando...</div>;
    if (error) return <div className="error-message">{error}</div>;

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
                        value={formData.proyecto.toString()} // Forzar a string
                        onChange={(e) => setFormData({...formData, proyecto: e.target.value})}
                    >
                        {proyectos.map((proyecto) => (
                            <option key={proyecto.id} value={proyecto.id.toString()}> {/* Valor como string */}
                                {proyecto.titulo}
                            </option>
                        ))}
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