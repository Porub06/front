import { useState } from "react";

const steps = ["Személyes adatok", "Cím", "Ellenőrzés"];
const initialFormData = {
    name: "",
    email: "",
    address: "",
};

export default function MultiForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [isComplete, setIsComplete] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentData) => ({ ...currentData, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (step < steps.length) {
            setStep((currentStep) => currentStep + 1);
            return;
        }
        setIsComplete(true);
    };

    const handleBack = () => {
        setStep((currentStep) => Math.max(1, currentStep - 1));
    };

    const handleReset = () => {
        setFormData(initialFormData);
        setStep(1);
        setIsComplete(false);
    };

    if (isComplete) {
        return (
            <section className="multi-form" aria-live="polite">
                <div className="multi-form__success-icon" aria-hidden="true">
                    ✓
                </div>
                <h1 className="multi-form__title">Sikeres beküldés</h1>
                <p className="multi-form__description">Köszönjük, {formData.name}! Az adataidat rögzítettük.</p>
                <button className="multi-form__button" type="button" onClick={handleReset}>
                    Új űrlap kitöltése
                </button>
            </section>
        );
    }

    return (
        <section className="multi-form">
            <h1 className="multi-form__title">Többlépéses űrlap</h1>
            <p className="multi-form__description">Töltsd ki az adatokat a folytatáshoz.</p>

            <ol className="multi-form__steps" aria-label="Űrlap lépései">
                {steps.map((label, index) => {
                    const stepNumber = index + 1;
                    const status = stepNumber === step ? "current" : stepNumber < step ? "complete" : "upcoming";
                    return (
                        <li
                            className={`multi-form__step multi-form__step--${status}`}
                            key={label}
                            aria-current={stepNumber === step ? "step" : undefined}
                        >
                            <span className="multi-form__step-number">{stepNumber < step ? "✓" : stepNumber}</span>
                            <span>{label}</span>
                        </li>
                    );
                })}
            </ol>

            <form className="multi-form__body" onSubmit={handleSubmit}>
                {step === 1 && (
                    <>
                        <div className="multi-form__field">
                            <label htmlFor="multi-name">Teljes név</label>
                            <input
                                id="multi-name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Például Kovács Anna"
                                required
                            />
                        </div>
                        <div className="multi-form__field">
                            <label htmlFor="multi-email">E-mail-cím</label>
                            <input
                                id="multi-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="anna@example.com"
                                required
                            />
                        </div>
                    </>
                )}

                {step === 2 && (
                    <div className="multi-form__field">
                        <label htmlFor="multi-address">Lakcím</label>
                        <input
                            id="multi-address"
                            name="address"
                            type="text"
                            autoComplete="street-address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Irányítószám, város, utca, házszám"
                            required
                        />
                    </div>
                )}

                {step === 3 && (
                    <dl className="multi-form__review">
                        <div>
                            <dt>Teljes név</dt>
                            <dd>{formData.name}</dd>
                        </div>
                        <div>
                            <dt>E-mail-cím</dt>
                            <dd>{formData.email}</dd>
                        </div>
                        <div>
                            <dt>Lakcím</dt>
                            <dd>{formData.address}</dd>
                        </div>
                    </dl>
                )}

                <div className="multi-form__actions">
                    {step > 1 && (
                        <button
                            className="multi-form__button multi-form__button--secondary"
                            type="button"
                            onClick={handleBack}
                        >
                            Vissza
                        </button>
                    )}
                    <button className="multi-form__button" type="submit">
                        {step === steps.length ? "Beküldés" : "Tovább"}
                    </button>
                </div>
            </form>
        </section>
    );
}
