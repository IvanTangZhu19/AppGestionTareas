function crearProyecto(data){
    const proyectos = JSON.parse(localStorage.getItem('proyectos'));
    if(!proyectos){
        localStorage.setItem('proyectos', JSON.stringify(
            [
                {
                    "id": 1,
                    "titulo": "Predeterminado",
                    "descripcion": "Proyecto predeterminado",
                    "fecha": null,
                    "tareas": [],
                    "estado": "activo"
                }
            ]
        ));
    }
    const id = proyectos.length +1;
    const proyecto = {
        "id": id,
        "titulo": data.titulo,
        "descripcion": data.descripcion,
        "fecha": data.fecha,
        "tareas": [],
        "estado": "activo"
    }
    const proyectosConNuevo = [...proyectos, proyecto];
    localStorage.setItem('proyectos', JSON.stringify(proyectosConNuevo));
}

export default crearProyecto;