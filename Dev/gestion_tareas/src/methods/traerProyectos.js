function traerProyectos(){
    const proyectos = JSON.parse(localStorage.getItem('proyectos'));
    if(!proyectos){
        localStorage.setItem('proyectos', JSON.stringify(
            [
                {
                    "id": 1,
                    "titulo": "Predeterminado",
                    "descripcion": "Proyecto predeterminado",
                    "fecha": null,
                    "tareas": [],
                    "estado": "activo"
                }
            ]
        ))
    }
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

export default traerProyectos;