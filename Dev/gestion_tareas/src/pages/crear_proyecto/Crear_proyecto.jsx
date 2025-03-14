import React, { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import "./Crear_Proyecto.scss";
import crearProyecto from "./../../methods/crearProyecto";

function Crear_Proyecto() {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        fecha: '',
        color: '#ffffff'
    });
    const [error, setError] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const hoy = new Date();
        const fecha = new Date(formData.fecha);

        if (fecha <= hoy) {
            setError("La fecha debe ser mayor al día de hoy");
            return;
        }

        crearProyecto(formData);
        navigate("/proyectos");
    };
    return (
        <div className="contenedor-formulario">
            <span />
            <h2>Crear proyecto</h2>
            <form onSubmit={handleSubmit}>
                <div className="campo-formulario">
                    <label>Título</label>
                    <input
                        type="text"
                        value={formData.titulo}
                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                        required
                    />
                </div>

                <div className="campo-formulario">
                    <label>Fecha</label>
                    <input
                        type="date"
                        value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                        required
                    />
                </div>

                <div className="campo-formulario">
                    <label>Descripción</label>
                    <textarea
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        required
                    />
                </div>
                <div className="campo-formulario color-field">
                    <label htmlFor="color">Color del Proyecto</label>
                    <div className="color-picker-wrapper">
                        <input
                            id="color"
                            type="color"
                            value={formData.color}
                            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        />
                        <div
                            className="color-preview"
                            style={{ backgroundColor: formData.color }}
                        />
                    </div>
                </div>
                {error.length > 0 &&
                    <p>{error}</p>
                }
                <div className="botones-formulario">
                    <NavLink to="/proyectos" className="cancelar">Cancelar</NavLink>
                    <button type="submit">Crear</button>
                </div>
            </form>
        </div>
    );
}

export default Crear_Proyecto;