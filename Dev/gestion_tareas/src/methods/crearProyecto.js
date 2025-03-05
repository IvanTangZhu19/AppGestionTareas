function crearProyecto(data) {
    let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    
    // Si no hay proyectos, crear el predeterminado
    if (proyectos.length === 0) {
        proyectos = [
            {
                "id": 1,
                "titulo": "Predeterminado",
                "descripcion": "Proyecto predeterminado",
                "fecha": null,
                "tareas": [],
                "estado": "activo"
            }
        ];
        localStorage.setItem('proyectos', JSON.stringify(proyectos));
    }

    const id = proyectos.length + 1;
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