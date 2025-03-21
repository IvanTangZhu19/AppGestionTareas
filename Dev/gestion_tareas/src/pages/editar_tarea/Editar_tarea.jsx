import React, { useState, useEffect } from 'react';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import './../crear_tarea/Crear_tarea.scss';
import editarTarea from '../../methods/editarTarea';
import traerProyectos from '../../methods/traerProyectos';

function Editar_Tarea() {
    const { proyectoId, tareaId } = useParams();
    const navigate = useNavigate();
    const [proyectos, setProyectos] = useState([]);
    const [formData, setFormData] = useState({ titulo: '', fecha: '', descripcion: '', proyecto: 0 });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const proyectosData = traerProyectos();
        const proyectosCompletos = proyectosData[0].proyectos.concat(proyectosData[1].proyectos);
        setProyectos(proyectosCompletos);
    }, []);

    useEffect(() => {
        //console.log("Lista de proyectos cargada:", proyectos);
        //console.log("Buscando proyecto con ID:", proyectoId);

        if (proyectos.length === 0) return;

        const proyecto = proyectos.find(p => p.id == parseInt(proyectoId));
        //console.log("Proyecto encontrado:", proyecto);

        if (!proyecto) {
            setError('Proyecto no encontrado');
            setCargando(false);
            return;
        }

        //console.log("Buscando tarea con ID:", tareaId);
        const tarea = proyecto.tareas?.find(t => t.id == parseInt(tareaId));
        //console.log("Tarea encontrada:", tarea);

        if (!tarea) {
            setError('Tarea no encontrada');
            setCargando(false);
            return;
        }

        setFormData({
            titulo: tarea.titulo,
            descripcion: tarea.descripcion,
            fecha: tarea.fecha?.split('T')[0] || '',
            proyecto: proyecto.id.toString()
        });

        setCargando(false);
    }, [proyectos, proyectoId, tareaId]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const hoy = new Date();
        const fecha = new Date(formData.fecha);

        if (fecha <= hoy) {
            setError("La fecha debe ser mayor al día de hoy");
            return;
        }
        const exito = editarTarea(proyectoId, tareaId, formData);
        if (exito) {
            setTimeout(() => navigate('/tareas'), 100);
        } else {
            setError("Error al guardar la tarea. Verifica los datos.");
        }
    };

    if (cargando) return <div>Cargando...</div>;
    //if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="contenedor-formulario">
            <span />
            <header className="header-edicion">
                <h2>Editar tarea</h2>
            </header>
            <form onSubmit={handleSubmit} className="formulario-edicion">
                <div className="campo-formulario">
                    <label>Título</label>
                    <input
                        type="text"
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                    />
                </div>
                <div className="campo-formulario">
                    <label>Fecha</label>
                    <input
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    />
                </div>
                <div className="campo-formulario">
                    <label>Descripción</label>
                    <textarea
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    />
                </div>
                <div className="campo-formulario">
                    <label>Proyecto</label>
                    <select
                        value={formData.proyecto.toString()}
                        onChange={(e) => setFormData({ ...formData, proyecto: e.target.value })}
                    >
                        {proyectos.map((proyecto) => (
                            <option key={proyecto.id} value={proyecto.id}>
                                {proyecto.titulo}
                            </option>
                        ))}
                    </select>
                </div>
                {
                    error.length > 0 &&
                    <p>{error}</p>
                }
                <div className="botones-accion">
                    <NavLink to="/tareas" className="boton-cancelar">Cancelar</NavLink>
                    <button type="submit" className="boton-guardar">Guardar cambios</button>
                </div>
            </form>
        </div>
    );
}

export default Editar_Tarea;
