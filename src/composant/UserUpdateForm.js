// src/composant/UserUpdateForm.js

import React, { useState, useEffect } from "react";
import api from "../Api";

function UserUpdateForm({ user, onUpdate, onCancel }) {
    // initialisena en champ vide ny formData
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username,
                email: user.email
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.put(`/utilisateurs/${user.user_id}`, formData)
            .then(response => {
                onUpdate(response.data);
            })
            .catch(error => console.error('Error updating user:', error));
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
            <button type="submit">Update User</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
}

export default UserUpdateForm;
