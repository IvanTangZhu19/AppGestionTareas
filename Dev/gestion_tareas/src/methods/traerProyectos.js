function traerProyectos() {
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];
    
    // Asegurar que todos los proyectos tengan "tareas" y "estado"
    const proyectosFormateados = proyectos.map(proyecto => ({
        ...proyecto,
        tareas: proyecto.tareas || [],
        estado: proyecto.estado || "activo"
    }));

    const pendientes = proyectosFormateados.filter(p => p.estado == "activo");
    const completados = proyectosFormateados.filter(p => p.estado == "completado");

    return [
        { titulo: "Proyectos Pendientes", proyectos: pendientes },
        { titulo: "Proyectos Completados", proyectos: completados }
    ];
}

export default traerProyectos;