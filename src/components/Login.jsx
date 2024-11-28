import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // Importation de useNavigate pour rediriger

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Déclaration du hook useNavigate pour la redirection

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
            // Effectuer une requête POST vers l'API de connexion
            const response = await axios.post("http://localhost:8000/api/login", formData);
            
            // Si la connexion est réussie, rediriger vers la page des destinations
            setMessage(response.data.message);
            setErrors({});
            navigate("/destinations");  // Redirection vers la page des destinations après connexion réussie
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                setMessage("Une erreur est survenue lors de la connexion.");
            }
        }
    };

    return (
        <div>
            <h2>Connexion</h2>
            {message && <p style={{ color: "green" }}>{message}</p>}
            <form onSubmit={handleSubmit}>
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

                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
};

export default Login;
