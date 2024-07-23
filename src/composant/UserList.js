import React, { useState, useEffect } from 'react';
import api from '../Api'; // Importez l'instance d'API

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get('/utilisateurs') // Utilisez l'instance d'API pour la requête
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    return (
        <div>
            <h1>User List</h1>
            <ul>
                {users.map(user => (
                    <li key={user.user_id}>{user.username} ({user.email})</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
