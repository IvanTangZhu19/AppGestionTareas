function editarTarea(proyectoId, tareaId, nuevosDatos) {
    let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    let proyectoIndex = proyectos.findIndex(p => p.id === Number(proyectoId));

    if (proyectoIndex === -1) return false;

    let tareaIndex = proyectos[proyectoIndex].tareas.findIndex(
        t => t.id === Number(tareaId)
    );

    if (tareaIndex === -1) return false;

    // Mantener el estado actual de la tarea
    let estadoActual = proyectos[proyectoIndex].tareas[tareaIndex].estado || "activo";

    // Actualizar los campos editables
    proyectos[proyectoIndex].tareas[tareaIndex] = {
        ...proyectos[proyectoIndex].tareas[tareaIndex],
        titulo: nuevosDatos.titulo,
        descripcion: nuevosDatos.descripcion,
        fecha: nuevosDatos.fecha || new Date().toISOString().split('T')[0],
        estado: estadoActual
    };

    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    return true;
}

export default editarTarea;
