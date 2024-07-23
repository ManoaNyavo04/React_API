import logo from './logo.svg';
import './App.css';
import UserList from './composant/UserList';
import UserForm from './composant/UserForm';
import { User_hook } from './hooks/User_hook';
import UserListUpdate from './composant/UserListUpdate';
import UserUpdateForm from './composant/UserUpdateForm';

function App() {
  const {users, addUser, editingUser, updateUser, editUser, cancelEdit} = User_hook();
  return (
    <div>
      <h1>Liste users</h1>
      <UserList users= {users} />
      <UserForm onUserAdded = {addUser} />

      <UserListUpdate users = {users} onEditUser = {editUser} />
      {editingUser && (
                <UserUpdateForm
                    user={editingUser}
                    onUpdate={updateUser}
                    onCancel={cancelEdit}
                />
            )}
    </div>
  );
}

export default App;
