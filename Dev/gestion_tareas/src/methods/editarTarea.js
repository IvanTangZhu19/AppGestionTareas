function editarTarea(proyectoId, tareaId, nuevosDatos) {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const proyectoIndex = proyectos.findIndex(p => p.id === Number(proyectoId));
    
    if (proyectoIndex === -1) return false;
    
    const tareaIndex = proyectos[proyectoIndex].tareas.findIndex(
        t => t.id === Number(tareaId)
    );
    
    if (tareaIndex === -1) return false;
    
    // Actualiza los campos editables
    proyectos[proyectoIndex].tareas[tareaIndex] = {
        ...proyectos[proyectoIndex].tareas[tareaIndex],
        titulo: nuevosDatos.titulo,
        descripcion: nuevosDatos.descripcion,
        fecha: nuevosDatos.fecha || new Date().toISOString().split('T')[0] // Formato YYYY-MM-DD
    };
    
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    return true;
}
export default editarTarea;