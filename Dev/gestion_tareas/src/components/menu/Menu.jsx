import "./Menu.scss";
import React from 'react';
//import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import iconoTarea from "./../../assets/task.svg";
import iconoProyectos from "./../../assets/tasks.svg";
import iconoHome from "./../../assets/home.svg";

function Menu() {
    return (
        <div className="menu">
            <div>
                <NavLink className={({ isActive }) => isActive ? "enlace activo" : "enlace"} 
                    to="/"><img src={iconoHome} alt="" />
                </NavLink>
            </div>
            <div>
                <NavLink className={({ isActive }) => isActive ? "enlace activo" : "enlace"} 
                    to="/tareas"><img src={iconoTarea} alt="" />
                </NavLink>
            </div>
            <div>
                <NavLink className={({ isActive }) => isActive ? "enlace activo" : "enlace"} 
                    to="/proyectos"><img className="proyecto" src={iconoProyectos} alt="" />
                </NavLink>
            </div>
        </div>
    );
}

export default Menu;