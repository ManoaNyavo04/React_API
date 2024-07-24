import React from 'react';
import { useAuth } from './Auth/User_context'; 

const Home = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <h1>Welcome, User {user.user_id}</h1>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Home;
