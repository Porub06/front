import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';
import TermekKartya from './TermekKartya';

export default function TermekLista() {
    const [termekLista, setTermekLista] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/termekek');
                setTermekLista(response.data);
            }
            catch (error) {
                console.error('Hiba a termékek lekérésekor:', error);
                setError(error);
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="page-title">Termékek</h1>
            {loading && <p className="product-state" role="status">Adatok betöltése...</p>}
            {error && <p className="product-state product-state--error" role="alert">Hiba történt: {error.message}</p>}
            {!loading && !error && (
                <div className="product-list">
                    {termekLista.map((termek) => (
                        <TermekKartya key={termek.id} termek={termek} />
                    ))}
                </div>
            )}
        </div>
    );
}