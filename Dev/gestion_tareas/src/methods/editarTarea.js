import eliminarTarea from "./eliminarTarea";

function editarTarea(proyectoId, tareaId, nuevosDatos) {
    let proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    let proyectoIndex = proyectos.findIndex(p => p.id === parseInt(proyectoId));

    if (proyectoIndex === -1) return false;

    let tareaIndex = proyectos[proyectoIndex].tareas.findIndex(
        t => t.id === Number(tareaId)
    );

    if (tareaIndex === -1) return false;

    let estadoActual = proyectos[proyectoIndex].tareas[tareaIndex].estado || "activo";

    if (parseInt(proyectoId) == parseInt(nuevosDatos.proyecto)) {

        // Actualizar los campos editables
        proyectos[proyectoIndex].tareas[tareaIndex] = {
            ...proyectos[proyectoIndex].tareas[tareaIndex],
            titulo: nuevosDatos.titulo,
            descripcion: nuevosDatos.descripcion,
            fecha: nuevosDatos.fecha || new Date().toISOString().split('T')[0],
            estado: estadoActual
        };

        localStorage.setItem('proyectos', JSON.stringify(proyectos));
    } else {
        const Tarea = {
            id: tareaId,
            titulo: nuevosDatos.titulo,
            descripcion: nuevosDatos.descripcion,
            fecha: nuevosDatos.fecha,
            estado: estadoActual
        };
        let proyectoNuevoIndex = proyectos.findIndex(p => p.id == parseInt(nuevosDatos.proyecto));
        proyectos[proyectoNuevoIndex].tareas.push(Tarea);

        //Elimina la tarea en el antiguo proyecto
        proyectos[proyectoIndex].tareas = proyectos[proyectoIndex].tareas.filter(
            t => t.id != parseInt(tareaId)
        );

        localStorage.setItem('proyectos', JSON.stringify(proyectos));

    }

    return true;
}

export default editarTarea;
