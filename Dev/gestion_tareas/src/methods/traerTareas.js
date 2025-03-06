function traerTareas(){
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    let tareasPendientes = [], tareasCompletadas = [];
    if(proyectos){
        const tareas = proyectos.reduce((tareas, proyecto) => {
            return tareas.concat(proyecto.tareas);
        }, []);
    
        tareasPendientes = tareas.filter(
            tarea => tarea.estado === 'activo');
        tareasCompletadas = tareas.filter(
            tarea => tarea.estado === 'completado');
        
        tareasPendientes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
        tareasCompletadas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    }
    return [
        { titulo: "Tareas Pendientes", tareas: tareasPendientes },
        { titulo: "Tareas Completadas", tareas: tareasCompletadas }
    ];
}

export default traerTareas;