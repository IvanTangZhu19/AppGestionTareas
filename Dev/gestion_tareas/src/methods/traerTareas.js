function traerTareas(){
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    const proyectoPendientes = proyectos.filter(
        proyecto => proyecto.estado === 'activo');
    const proyectosCompletados = proyectos.filter(
        proyecto => proyecto.estado === 'completado');
    return [
        {
            "titulo": "Proyectos Pendientes",
            "proyectos": proyectoPendientes
        },
        {  
            "titulo": "Proyectos completados",
            "proyectos": proyectosCompletados
        }
    ];
}

export default traerTareas;