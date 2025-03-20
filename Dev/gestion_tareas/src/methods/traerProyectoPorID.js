function traerProyectoPorID(id){
    const proyectos = JSON.parse(localStorage.getItem('proyectos')) || [];

    const proyecto = proyectos.find(p=> p.id === parseInt(id));

    return proyecto;
}
export default traerProyectoPorID;