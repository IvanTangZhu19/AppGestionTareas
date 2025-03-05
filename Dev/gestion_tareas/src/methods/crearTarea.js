function crearTarea(data) {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    let ultimoTareaID = parseInt(localStorage.getItem('tareaID')) || 0;

    // Buscar proyecto activo por ID
    const proyecto = proyectos.find(p => 
        p.id === parseInt(data.proyectoID) && 
        p.estado === "activo"
    );

    if (!proyecto) return false;

    // Crear nueva tarea
    const nuevaTarea = {
        id: ultimoTareaID + 1,
        titulo: data.titulo,
        descripcion: data.descripcion,
        fecha: data.fecha,
        estado: "activo"
    };

    proyecto.tareas.push(nuevaTarea);
    localStorage.setItem('tareaID', ultimoTareaID + 1);
    localStorage.setItem('proyectos', JSON.stringify(proyectos));

    return true;
}

export default crearTarea;