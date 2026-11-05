import { NavLink } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <NavLink className="navbar__brand" to="/">Webprojekt</NavLink>
            <div className="navbar__links">
                <NavLink to="/" end>Kezdőlap</NavLink>
                <NavLink to="/termekek">Termékek</NavLink>
                <NavLink to="/login">Bejelentkezés</NavLink>
                <NavLink to="/register">Regisztráció</NavLink>
                <NavLink to="/user">Felhasználó</NavLink>
                <NavLink to="/multiform">Többlépéses űrlap</NavLink>
            </div>
        </nav>
    );
}
