function crearTarea(data){
    const proyectos = JSON.parse(localStorage.getItem('proyectos'));
    const proyectoIndex = proyectos.findIndex(
        proyecto => proyecto.id === data.id && proyecto.estado === 'activo');
    if(proyectoIndex != -1){
        proyectos[proyectoIndex].tareas.push(
            {
                "titulo": data.titulo,
                "descripcion": data.descripcion,
                "fecha": data.fecha,
                "estado": "activo"
            }
        );
    }
}

export default crearTarea;