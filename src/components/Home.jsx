import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="home">
            <p className="home__eyebrow">Üdvözlünk</p>
            <h1>Üdvözöljük a honlapon!</h1>
            <p className="home__description">
                Fedezd fel a termékeket, vagy jelentkezz be a saját fiókodba.
            </p>
            <Link className="home__link" to="/termekek">Termékek megtekintése</Link>
        </section>
    );
}
