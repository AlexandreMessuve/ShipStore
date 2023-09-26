import React from 'react';
import LoginForm from "../component/LoginForm";

const Login = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
        window.location.href = '/';
        return
    }
    return (
        <>
            <div className={'flex justify-center my-16 bg-white'}>
                <LoginForm/>
            </div>
        </>

    );
};

export default Login;