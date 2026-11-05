export default function TermekKartya({ termek }) {
    return (
        <article className="product-card">
            <h3>{termek.nev}</h3>
            <div className="product-card__details">
                <p className="product-card__price">{termek.ar} Ft</p>
                <span className="product-card__stock">Készlet: {termek.keszlet}</span>
            </div>
        </article>
    );
}