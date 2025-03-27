import traerProyectoPorID from "./../../methods/traerProyectoPorID";
import eliminarTarea from "./../../methods/eliminarTarea";
import completarTarea from "./../../methods/completarTarea";
import eliminarProyecto from "./../../methods/eliminarProyecto";
import completarProyecto from "./../../methods/completarProyecto";

export const handleEliminarTarea = (proyectoId, tareaId, setProyecto) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar esta tarea?");
    if (confirmacion) {
        if (eliminarTarea(proyectoId, tareaId)) {
            // Actualizar listado tras eliminar
            setTimeout(() => setProyecto(traerProyectoPorID(parseInt(proyectoId))), 100);
        }
    }
};

export const handleEliminarProyecto = (id, navigate) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar este proyecto?");
    if (confirmacion) {
        eliminarProyecto(id);
        navigate("/proyectos");
    }
};

export const handleCompletarTarea = (proyectoId, tareaId, setProyecto) => {
    if (completarTarea(proyectoId, tareaId)) {
        // Actualizar listado tras completar
        setTimeout(() => setProyecto(traerProyectoPorID(parseInt(proyectoId))), 100);
    }
};

export const handleCompletarProyecto = (id, setProyecto) => {
    if (completarProyecto(id)) {
        const proyecto = traerProyectoPorID(id);
        setProyecto({
            titulo: proyecto.titulo,
            fecha: proyecto.fecha,
            descripcion: proyecto.descripcion,
            color: proyecto.color,
            tareas: proyecto.tareas,
            estado: proyecto.estado
        });
    }
  };