// eslint-disable-next-line no-unused-vars
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useContext(AuthContext);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="Email" />
            <input type="password" name="password" value={formData.password} onChange={onChange} placeholder="Password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
