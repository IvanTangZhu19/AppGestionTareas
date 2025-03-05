function eliminarTarea(proyectoId, tareaId) {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const proyectoIndex = proyectos.findIndex(p => p.id === parseInt(proyectoId));
    if (proyectoIndex === -1) return false;
    
    proyectos[proyectoIndex].tareas = proyectos[proyectoIndex].tareas.filter(
        t => t.id !== parseInt(tareaId)
    );
    
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    return true;
}

export default eliminarTarea;