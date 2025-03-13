function editarProyecto(id, nuevosDatos) {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const proyectoIndex = proyectos.findIndex(p => p.id === parseInt(id));
    if (proyectoIndex === -1) return false;
    
    proyectos[proyectoIndex] = { 
      ...proyectos[proyectoIndex], 
      titulo: nuevosDatos.titulo || proyectos[proyectoIndex].titulo,
      descripcion: nuevosDatos.descripcion || proyectos[proyectoIndex].descripcion,
      fecha: nuevosDatos.fecha || proyectos[proyectoIndex].fecha,
      tareas: nuevosDatos.tareas || proyectos[proyectoIndex].tareas,
      color: nuevosDatos.color || proyectos[proyectoIndex].color
    };
    
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    return true;
  }
  
  export default editarProyecto;
  