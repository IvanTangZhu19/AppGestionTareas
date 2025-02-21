import "./Menu.scss";
import React from 'react';
import { Link } from 'react-router-dom';
function Menu() {
    return (
        <div className="menu">
            <h2><Link to="/">Inicio</Link></h2>
            <h2><Link to="/">Tareas</Link></h2>
            <h2><Link to="/">Proyectos</Link></h2>
        </div>
    );
}

export default Menu;