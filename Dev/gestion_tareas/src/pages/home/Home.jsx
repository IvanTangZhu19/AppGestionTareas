import "./Home.scss";
import React, { useState, useEffect, useRef } from 'react';
import traerTareas from "../../methods/traerTareas";
import traerProyectos from "../../methods/traerProyectos"

function Home() {
    const [tareas, setTareas] = useState([]);
    const [proyectos, setProyectos] = useState([]);
    const tareasRef = useRef(null);

    useEffect(() => {
        const tareas = traerTareas();
        setTareas(tareas[0].tareas);
        setProyectos(traerProyectos()[0].proyectos);
    }, []);

    const scroll = (ref, direccion) => {
        if(ref.current){
            const scrollAmount = direccion == 'left' ? -200 : 200
            ref.current.scrollLeft += scrollAmount;
        }
    };
    
    return (
        <div className="contenedor">
            <span/>
            <h2>Inicio</h2>
            <p className="subtitulo">Tareas pendientes</p>
            <div className="tareasInicio">
            <button className="boton-navegacion izquierda" onClick={() => scroll(tareasRef, 'left')}>{"<"}</button>
                {tareas.map((tarea, index) => (
                    <div key={index} className="contenedor_tarea">
                        <p>{tarea.titulo}</p>
                        <p>{tarea.fecha}</p>
                    </div>
                ))}
                <button className="boton-navegacion derecha" onClick={() => scroll(tareasRef, 'right')}>{">"}</button>
            </div>
            <p className="subtitulo">Proyectos pendientes</p>
            <div className="proyectosInicio">
                {proyectos.map((proyecto) => (
                    <div className="contenedor_proyecto" key={proyecto.id}>
                        <p>{proyecto.titulo}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;