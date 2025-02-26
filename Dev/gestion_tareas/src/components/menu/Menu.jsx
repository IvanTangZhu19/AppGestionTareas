import "./Menu.scss";
import React from 'react';
//import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
function Menu() {
    return (
        <div className="menu">
            <h2>
                <NavLink className={({ isActive }) => isActive ? "enlace activo" : "enlace"} 
                    to="/">Inicio
                </NavLink>
            </h2>
            <h2>
                <NavLink className={({ isActive }) => isActive ? "enlace activo" : "enlace"} 
                    to="/tareas">Tareas
                </NavLink>
            </h2>
            <h2>
                <NavLink className={({ isActive }) => isActive ? "enlace activo" : "enlace"} 
                    to="/proyectos">Proyectos
                </NavLink>
            </h2>
        </div>
    );
}

export default Menu;