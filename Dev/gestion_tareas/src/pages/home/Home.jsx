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
        console.log("tareasRef.current:", tareasRef.current);
    }, []);
    const scroll = (ref, direction) => {
        if (ref.current) {
            console.log("Scroll amount:", direction === 'left' ? -150 : 150);
            const scrollAmount = direction === 'left' ? -150 : 150;
            ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
            console.log("ScrollLeft después del desplazamiento:", ref.current.scrollLeft);
        } else {
            console.log("⚠ ref.current es null o undefined");
        }
    };
    return (
        <div className="contenedor">
            <span />
            <h2>Inicio</h2>
            <p className="subtitulo">Tareas pendientes</p>
            <div className="tareasInicio">
                {/*<button className="boton-navegacion">‹</button>*/}
                <button className="boton-navegacion izquierda" onClick={() => scroll(tareasRef, 'left')}>{"<"}</button>
                <div className="seccion" ref={tareasRef}>
                    {tareas.map((tarea, index) => (
                        <div key={index} className="contenedor_tarea">
                            <p>{tarea.titulo}</p>
                            <p>{tarea.fecha}</p>
                        </div>
                    ))}
                </div>
                <button className="boton-navegacion derecha" onClick={() => scroll(tareasRef, 'right')}>{">"}</button>
                {/*<button className="boton-navegacion">›</button>*/}
            </div>
            <p className="subtitulo">Proyectos pendientes</p>
            <div className="proyectosInicio">
                {proyectos.map((proyecto) => (
                    <div className="contenedor_proyecto" key={proyecto.id}>
                        <p>{proyecto.titulo} {proyecto.fecha}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;