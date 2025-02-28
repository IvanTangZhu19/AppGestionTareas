import "./Header.scss";
import logo from "../../assets/Logo2.png";
function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Logo" />
            <h2>TaskMaster</h2>
        </header>
    );
}

export default Header;