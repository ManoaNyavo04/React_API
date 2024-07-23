import { useState, useEffect } from "react";
import api from "../Api";
import UserUpdateForm from "./UserUpdateForm";

function UserListUpdate() {
    const [listeUsers, setUsers] = useState([]);
    // pour gérer les users en cours d'edition
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        api.get('/utilisateurs') // Utilisez l'instance d'API pour la requête
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    // met à jour la liste des utilisateurs et réinitialise l'édition en cours après une mise à jour réussie.
    const handleUpdateUser = (updatedUser) => {
        setUsers(listeUsers.map(user => user.user_id === updatedUser.user_id ? updatedUser : user)); // Si l'ID de l'utilisateur correspond à l'ID de l'utilisateur mis à jour, remplace l'utilisateur par l'utilisateur mis à jour, sinon, conserve l'utilisateur actuel.
        setEditingUser(null); //Réinitialise l'état de l'utilisateur en cours d'édition à null après la mise à jour.
    };

    // met l'utilisateur sélectionné en mode d'édition.
    const handleEditClick = (user) => {
        setEditingUser(user);
    };

    //  annule l'édition en cours et réinitialise l'état editingUser.
    const handleCancelEdit = () => {
        setEditingUser(null);
    };

    return (
        <div>
            <h1>Update users</h1>

            <table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Nom</td>
                        <td>Email</td>
                        <td>Action</td>
                    </tr>
                </thead>

                <tbody>
                    {
                        listeUsers.map(users=>(
                        <tr key={users.user_id}>
                        <>
                            <td>{users.user_id}</td>
                            <td>{users.username}</td>
                            <td>{users.email}</td>
                            <button onClick={() => handleEditClick(users)}>Edit</button>
                        </>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* alefa atao parametre (en tant que props) ao am UserUpdateForm user, onUpdate, onCancel */}
            {editingUser && (
                <UserUpdateForm
                    user={editingUser}
                    onUpdate={handleUpdateUser}
                    onCancel={handleCancelEdit}
                />
            )}
        </div>
    );
}

export default UserListUpdate;