import { useState } from "react";
import api from "../api/axiosInstance";
import "./useForm.css";

const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    role: "developer",
    newsletter: false,
};

export default function UserForm() {
    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        let nextValue = value;
        if (type === "checkbox") {
            nextValue = checked;
        } else if (name === "age") {
            nextValue = value === "" ? "" : Number(value);
        }

        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: nextValue,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setMessage("");

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError("A vezetéknév és a keresztnév megadása kötelező.");
            return;
        }
        if (!formData.email.includes("@")) {
            setError("Adj meg érvényes, @ jelet tartalmazó e-mail-címet.");
            return;
        }
        if (formData.age !== "" && (!Number.isFinite(formData.age) || formData.age <= 0)) {
            setError("Az életkornak 0-nál nagyobb számnak kell lennie.");
            return;
        }

        setLoading(true);
        try {
            await api.post("/users/profile", {
                ...formData,
                age: formData.age === "" ? null : formData.age,
            });
            setMessage("A profil sikeresen elküldve.");
        } catch (requestError) {
            console.error("A profil beküldése sikertelen:", requestError);
            setError(requestError.response?.data?.error || "A profil beküldése sikertelen. Próbáld újra később.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="user_form">
            <h2>Felhasználói Adatlap</h2>
            <form onSubmit={handleSubmit}>
                <div className="user_form__field">
                    <label htmlFor="firstName">Vezetéknév *</label>
                    <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="Pl. Kovács"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="user_form__field">
                    <label htmlFor="lastName">Keresztnév *</label>
                    <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Pl. János"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="user_form__field">
                    <label htmlFor="profileEmail">E-mail cím *</label>
                    <input
                        id="profileEmail"
                        name="email"
                        type="email"
                        placeholder="kovacs.janos@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="user_form__field">
                    <label htmlFor="age">Életkor</label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        min="1"
                        placeholder="Pl. 30"
                        value={formData.age}
                        onChange={handleChange}
                    />
                </div>
                <div className="user_form__field">
                    <label htmlFor="role">Szerepkör:</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange}>
                        <option value="developer">Fejlesztő</option>
                        <option value="designer">Designer</option>
                        <option value="manager">Projektmenedzser</option>
                    </select>
                </div>
                <div className="user_form__checkbox">
                    <input
                        id="newsletter"
                        name="newsletter"
                        type="checkbox"
                        checked={formData.newsletter}
                        onChange={handleChange}
                    />
                    <label htmlFor="newsletter">Feliratkozás a hírlevélre</label>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Küldés..." : "Profil beküldése"}
                </button>
                {loading && <p role="status">A profil beküldése folyamatban...</p>}
                {error && (
                    <p className="user_form__error" role="alert">
                        {error}
                    </p>
                )}
                {message && (
                    <p className="user_form__success" role="status">
                        {message}
                    </p>
                )}
            </form>
        </section>
    );
}
