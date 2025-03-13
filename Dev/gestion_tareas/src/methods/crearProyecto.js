function crearProyecto(data) {
    let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    let id;
    // Si no hay proyectos el id empieza como 1
    if (proyectos.length == 0) {
        id = 1;
    } else {
        id = proyectos.length + 1;
    }

    const nuevoProyecto = {
        "id": id,
        "titulo": data.titulo,
        "descripcion": data.descripcion,
        "fecha": data.fecha,
        "tareas": [],
        "estado": "activo"
    };

    const proyectosActualizados = [...proyectos, nuevoProyecto];
    localStorage.setItem('proyectos', JSON.stringify(proyectosActualizados));
}

export default crearProyecto;