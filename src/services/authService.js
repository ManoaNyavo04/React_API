import axios from 'axios';

// Obtenez le token CSRF à partir des balises meta
const getCsrfToken = () => {
    const token = document.head.querySelector('meta[name="csrf-token"]');
    return token ? token.content : '';
};

// Configurez Axios
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['X-CSRF-TOKEN'] = getCsrfToken();

const API_URL = 'http://localhost:8000/api';

const register = (name, email, password, password_confirmation) => {
    return axios.post(`${API_URL}/register`, {
        name,
        email,
        password,
        password_confirmation
    });
};

const login = (email, password) => {
    return axios.post(`${API_URL}/login`, { email, password })
        .then(response => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('user'));
};

const authService = {
    register,
    login,
    getCurrentUser
};

export default authService;
