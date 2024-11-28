import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Pour la redirection après l'inscription

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const [message, setMessage] = useState("");  // Pour afficher les messages de succès
    const [errors, setErrors] = useState({});   // Pour afficher les erreurs de validation
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

    // Gérer les changements de formulaire
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Effectuer une requête POST vers l'API d'inscription Laravel
            const response = await axios.post("http://localhost:8000/api/register", formData);
            
            // Si l'inscription est réussie, on peut afficher un message et rediriger
            setMessage(response.data.message); // Afficher le message de succès
            setErrors({}); // Réinitialiser les erreurs

            // Rediriger vers la page de connexion après un délai de 2 secondes
            setTimeout(() => {
                navigate("/login");  // Rediriger vers la page de connexion
            }, 2000);  // Attendre 2 secondes pour afficher le message de succès

        } catch (error) {
            console.log("Erreur d'inscription:", error);
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors); // Afficher les erreurs de validation
            }
        }
    };

    return (
        <div>
            <h2>Inscription</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Nom:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.name && <p style={{ color: "red" }}>{errors.name[0]}</p>}

                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.email && <p style={{ color: "red" }}>{errors.email[0]}</p>}

                <label>
                    Mot de passe:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.password && <p style={{ color: "red" }}>{errors.password[0]}</p>}

                <label>
                    Confirmer le mot de passe:
                    <input
                        type="password"
                        name="password_confirmation"
                        value={formData.password_confirmation}
                        onChange={handleChange}
                        required
                    />
                </label>
                {errors.password_confirmation && <p style={{ color: "red" }}>{errors.password_confirmation[0]}</p>}

                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
};

export default Register;
