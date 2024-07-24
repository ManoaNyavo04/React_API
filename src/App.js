import logo from './logo.svg';
import './App.css';
import UserList from './composant/UserList';
import UserForm from './composant/UserForm';
import { User_hook } from './hooks/User_hook';
import UserListUpdate from './composant/UserListUpdate';
import UserUpdateForm from './composant/UserUpdateForm';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './composant/Auth/Login';
import Register from './composant/Auth/Register';
import authService from './services/authService';
import Home from './composant/Home';

function App() {
  const {users, addUser, editingUser, updateUser, editUser, cancelEdit} = User_hook();
  const PrivateRoute = ({ children }) => {
      const user = authService.getCurrentUser();
      return user ? children : <Navigate to="/register" />;
  };
  return (
    // <div>
    //   <h1>Liste users</h1>
    //   <UserList users= {users} />
    //   <UserForm onUserAdded = {addUser} />

    //   <UserListUpdate users = {users} onEditUser = {editUser} />
    //   {editingUser && (
    //             <UserUpdateForm
    //                 user={editingUser}
    //                 onUpdate={updateUser}
    //                 onCancel={cancelEdit}
    //             />
    //         )}
    // </div>

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        {/* Ajoutez une route par défaut ou de redirection pour les URLs non définies */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
