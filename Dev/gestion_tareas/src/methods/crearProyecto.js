function crearProyecto(data) {
    let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    let proyectoID = JSON.parse(localStorage.getItem('proyectoID')) || 1;

    proyectoID = proyectoID + 1;

    const nuevoProyecto = {
        "id": proyectoID,
        "titulo": data.titulo,
        "descripcion": data.descripcion,
        "fecha": data.fecha,
        "tareas": [],
        "estado": "activo",
        "color": data.color
    };

    const proyectosActualizados = [...proyectos, nuevoProyecto];
    localStorage.setItem('proyectos', JSON.stringify(proyectosActualizados));
    localStorage.setItem('proyectoID', JSON.stringify(proyectoID));
}

export default crearProyecto;