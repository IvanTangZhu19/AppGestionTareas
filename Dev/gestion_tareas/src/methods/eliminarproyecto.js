function eliminarProyecto(id) {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const nuevosProyectos = proyectos.filter(proyecto => proyecto.id !== parseInt(id));
    localStorage.setItem('proyectos', JSON.stringify(nuevosProyectos));
}

export default eliminarProyecto;