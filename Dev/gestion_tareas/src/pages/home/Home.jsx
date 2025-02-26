import "./Home.scss";
import React, { useState, useEffect } from 'react';

function Home() {
    const [tareas, setTareas] = useState([]);

    useEffect(() => {
        setTareas(traerTareas());
    }, []);
    
    return (
        <div className="contenedor">
            <span/>
            <h2>Inicio</h2>
            <p className="subtitulo">Tareas pendientes</p>
            <div className="tareas">
                {tareas.map((tarea, index) => (
                    <div key={index} className="contenedor_tarea">
                        <p>{tarea.nombre}</p>
                        <p>{tarea.fecha.toDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function traerTareas(){
    const tareas = [
        {
            "nombre": "Tarea de cálculo",
            "descripcion": "Descripcion de la tarea 1",
            "estado": "pendiente",
            "fecha": new Date("2021-10-10")
        },
        {
            "nombre": "Tarea de astronomía",
            "descripcion": "Descripcion de la tarea 1",
            "estado": "pendiente",
            "fecha": new Date("2021-10-10")
        }
    ];
    return tareas;
}

export default Home;