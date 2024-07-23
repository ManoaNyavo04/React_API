import { useState, useEffect } from "react";
import api from "../Api";

export function User_hook() {
    // ho an'ny liste users
    const [users, setUsers] = useState([]);

    const fetchUsers = () => {
        api.get('/utilisateurs')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const addUser = (user) => {
        setUsers([...users, user]);
    };

    const [editingUser, setEditingUser] = useState(null);

    const updateUser = (updatedUser) => {
        setUsers(users.map(user => user.user_id === updatedUser.user_id ? updatedUser : user));
        setEditingUser(null);
    };

    const editUser = (user) => {
        setEditingUser(user);
    };

    const cancelEdit = () => {
        setEditingUser(null);
    };

    return { users, addUser, editingUser, updateUser, editUser, cancelEdit };
}
