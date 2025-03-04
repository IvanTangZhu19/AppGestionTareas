function traerProyectos(){
    const proyectos = JSON.parse(localStorage.getItem('proyectos'));
    return proyectos;
}

export default traerProyectos;