function crearTarea(data){
    const proyectos = JSON.parse(localStorage.getItem('proyectos'));
    let ultimoTareaID = localStorage.getItem('tareaID');
    if(!ultimoTareaID){
        ultimoTareaID = 1;
        localStorage.setItem('tareaID', ultimoTareaID);
    } else {
        ultimoTareaID = parseInt(ultimoTareaID);
    }
    const proyectoIndex = proyectos.findIndex(
        proyecto => proyecto.id == data.proyectoID && proyecto.estado == 'activo');
    if(proyectoIndex != -1){
        proyectos[proyectoIndex].tareas.push(
            {
                "id": ultimoTareaID + 1,
                "titulo": data.titulo,
                "descripcion": data.descripcion,
                "fecha": data.fecha,
                "estado": "activo"
            }
        );
        localStorage.setItem('tareaID', ultimoTareaID + 1);
        localStorage.setItem('proyectos', JSON.stringify(proyectos));
    }
}

export default crearTarea;