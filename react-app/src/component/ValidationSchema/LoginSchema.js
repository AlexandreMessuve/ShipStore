import React from "react";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Cookie from 'js-cookie';
import {ImSpinner8} from "react-icons/im";
import {AiOutlineCheck} from "react-icons/ai";

function  LoginSchema() {

    const userSchema = Yup.object({
        email: Yup.string().email().required("L'adresse mail est obligatoire"),
        password: Yup.string()
            .required("Le mot de passe est obligatoire")
            .min(8, "Le mot de passe est trop court, minimum 8 characters.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Doit contenir un minimum de 8 charachers, Une majuscule, Une minuscule, Un nombre et Un character spécial")
    })

    const initialUserSignIn = {
        email: "",
        password:""
    }

    const onSubmit = (values) => {

        document.getElementById('loginButton').style.display ='none';
        document.getElementById('loginLoading').style.display ='block flex';
        console.log(values)
        axios.post("http://localhost:8000/api/login",
            {
                email: values.email,
                password: values.password
        })
            .then((res) => {
                console.log(res);
                document.getElementById('loginLoading').style.display ='none';
                document.getElementById('loginSuccess').style.display ='block flex';
                const value = res.data.token;
                localStorage.setItem("token", JSON.stringify(value));
                window.location.href = '/';
            })
            .catch((err) => {
                console.log(err)
                document.getElementById('loginLoading').style.display ='none';

                let message = err.response.data.message;
                if (message === "Invalid credentials."){
                    document.getElementById('loginButton').style.display ='block';
                    alert('Email ou mot de passe erroné')
                }else{
                    document.getElementById('loginButton').style.display ='block';
                    alert('Le serveur ne réponds pas')
                }
            })
    };

    const renderError = (message) => <p className="text-red-500 text-xs italic">{message}</p>;

    return (
        <Formik
            initialValues={initialUserSignIn}
            validationSchema={userSchema}
            onSubmit={async (values, { resetForm }) => {
                await onSubmit(values);
                resetForm();
            }}
        >
            <Form className={'w-full max-w-lg'}>
                <div className="container">
                    <h1 className={'text-2xl my-5 text-center'}>
                        Connexion
                    </h1>
                    <div>
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Email*
                        </label>
                            <Field
                                name="email"
                                type="text"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="exemple@exemple.com"
                            />
                            <ErrorMessage name="email" render={renderError} />
                    </div>
                    <div className={'mt-6'}>
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                            Mot de passe*
                        </label>
                            <Field
                                name="password"
                                type="password"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="********"
                            />
                            <ErrorMessage name="password" render={renderError} />
                        <span>Si vous n'avez pas de compte <a className={'text-blue-400 hover:text-blue-800'} href={'/register'}>inscrivez-vous</a></span>
                    </div>
                    <div className={'flex justify-center mt-14'}>
                        <button id={'loginButton'} type={'submit'} className={'shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded'}>
                            Connexion
                        </button>
                        <button style={{display: 'none'}} id={'loginLoading'} className={'shadow flex bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded'}>
                            <ImSpinner8 className={'animate-spin mx-2'}/> Chargement
                        </button>
                        <button style={{display: 'none'}} id={'loginSuccess'} className={'shadow flex justify-between bg-green-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-8 rounded'}>
                            <AiOutlineCheck /> Valider
                        </button>
                    </div>
                </div>
            </Form>
        </Formik>
    );

}
export default LoginSchema