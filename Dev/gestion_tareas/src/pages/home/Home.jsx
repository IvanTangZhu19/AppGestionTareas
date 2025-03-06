import "./Home.scss";
import React, { useState, useEffect } from 'react';
import traerTareas from "../../methods/traerTareas";

function Home() {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        const tareas = traerTareas();
        setTareas(tareas[0].tareas);
    }, []);
    
    return (
        <div className="contenedor">
            <span/>
            <h2>Inicio</h2>
            <p className="subtitulo">Tareas pendientes</p>
            <div className="tareasInicio">
                {tareas.map((tarea, index) => (
                    <div key={index} className="contenedor_tarea">
                        <p>{tarea.titulo}</p>
                        <p>{tarea.fecha}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;