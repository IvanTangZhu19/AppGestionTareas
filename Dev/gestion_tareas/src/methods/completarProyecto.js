function completarProyecto(id) {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const proyectoIndex = proyectos.findIndex(p => p.id === parseInt(id));
    if (proyectoIndex === -1) return false;
    
    proyectos[proyectoIndex].estado = 'completado';
    localStorage.setItem('proyectos', JSON.stringify(proyectos));
    return true;
}

export default completarProyecto;