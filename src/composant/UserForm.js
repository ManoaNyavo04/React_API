import React, { useState } from "react";
import api from "../Api";

function UserForm({ onUserAdded }) { // Recevoir onUserAdded comme prop
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    // Met à jour l'état du formulaire lorsqu'un champ change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Gère la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        
        api.post('/utilisateurs', formData)
            .then(response => {
                // Appelle la fonction onUserAdded pour rafraîchir la liste
                onUserAdded(response.data);
                // Réinitialise le formulaire
                setFormData({ username: '', email: '' });
            })
            .catch(error => console.error('Error creating user:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <button type="submit">Add User</button>
        </form>
    );
}

export default UserForm;
