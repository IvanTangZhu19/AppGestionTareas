function completarTarea(proyectoId, tareaId) {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const proyectoIndex = proyectos.findIndex(p => p.id === parseInt(proyectoId));
    if (proyectoIndex === -1) return false;
    
    const tareaIndex = proyectos[proyectoIndex].tareas.findIndex(
        t => t.id === parseInt(tareaId)
    );
    if (tareaIndex === -1) return false;
    
    proyectos[proyectoIndex].tareas[tareaIndex].estado = 'completado';
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    return true;
}

export default completarTarea;