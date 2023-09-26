import React from 'react';
import '../App.css';
import RegisterForm from "../component/RegisterForm";

const Register = () => {
    const token = localStorage.getItem('token');
    if (token !== null) {
        window.location.href = '/';
        return
    }
    return (
        <>
            <div id={'register'} className={'flex justify-center h-full w-50 bg-white my-16'}>
                <RegisterForm/>
            </div>
        </>

    );
};

export default Register;