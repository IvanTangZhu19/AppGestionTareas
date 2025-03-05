function editarProyecto(id, nuevosDatos) {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const proyectoIndex = proyectos.findIndex(p => p.id === parseInt(id));
    if (proyectoIndex === -1) return false;
    
    // Actualiza solo los campos permitidos (excluyendo id y tareas)
    proyectos[proyectoIndex] = { 
        ...proyectos[proyectoIndex], 
        titulo: nuevosDatos.titulo || proyectos[proyectoIndex].titulo,
        descripcion: nuevosDatos.descripcion || proyectos[proyectoIndex].descripcion,
        fecha: nuevosDatos.fecha || proyectos[proyectoIndex].fecha
    };
    
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    return true;
}

export default editarProyecto;