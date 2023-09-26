import React, {useState} from "react";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";

function  RegisterSchema() {
    const [suggestions, setSuggestions] = useState([]);
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("L'adresse mail est obligatoire"),
        password: Yup.string()
            .required("Le mot de passe est obligatoire")
            .min(8, "Le mot de passe est trop court, minimum 8 characters.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Doit contenir un minimum de 8 charachers, Une majuscule, Une minuscule, Un nombre et Un character spécial"),
        firstname: Yup.string()
            .required("Le prénom est obligatoire")
            .min(1, "Le prénom est trop court"),
        lastname: Yup.string()
            .required("Le nom de famille est obligatoire")
            .min(1, "Le nom de famille est trop court"),

        phone: Yup.string()
            .required("Le numéro de téléphone est obligatoire")
            .matches(phoneRegExp, "Le numéro de téléphone n'est pas valide")
            .min(10),

        adresse: Yup.string().required("L'adresse est obligatoire")
    });
    const initialUserSignUp = {
        email: "",
        password:"",
        firstname:"",
        lastname:"",
        phone:"",
        adresse:"",
    }
    let message = "";
    const onSubmit = (values) => {
        axios.post("https://localhost:8000/api/register",
            {
                email: values.email,
                plainPassword: values.password,
                firstname: values.firstname,
                lastname: values.lastname,
                phone: values.phone,
                adresse: values.adresse
            },
            {
                headers:
                    {
                    'Content-Type': 'application/json'
                    }
            }
            )
            .then(
                (res) => {window.location.href ='/login'}
                    )
            .catch((err)=> {
                if(err.response.data === 'error'){
                    alert('Erreur avec le serveur')
                }else if(err.response.data === 'error email'){
                    alert('Adresse email déjà enregistré')
                }
                }
            )

    }

    const adresse = (value) => {
            console.log(value);
            axios.get('https://api-adresse.data.gouv.fr/search/?q='+value).then((response) => {
                const adresses = response.data.features.map((feature) => ({
                    label: feature.properties.label,
                    id: feature.id,
                }));
                setSuggestions(adresses)
        }).catch(err => {
            console.error(err)
        })

    }

    const renderError = (message) => <p className="text-red-500 text-xs italic">{message}</p>;

    return (
        <Formik
            initialValues={initialUserSignUp}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
                await onSubmit(values);
            }}
        >
            {({values, handleChange, setFieldValue}) => (
            <Form className={'w-full max-w-lg mx-40 h-full p-10 border-2'}>
                <h1 className={'text-2xl my-5 text-center'}>
                    Inscription
                </h1>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Prénom*
                            </label>
                            <Field
                                id={'grid-first-name'}
                                name="firstname"
                                type="text"
                                required={true}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="John"
                            />
                            <ErrorMessage name="firstname" render={renderError} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Nom de famille*
                            </label>
                            <Field
                                id={'grid-last-name'}
                                name="lastname"
                                type="text"
                                required={true}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="Doe"
                            />
                            <ErrorMessage name="lastname" render={renderError} />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-email">
                                Email*
                            </label>
                            <Field
                                id={'grid-email'}
                                name="email"
                                type="email"
                                required={true}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="exemple@example.com"
                            />
                            <ErrorMessage name="email" render={renderError} />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                                Mot de passe*
                            </label>
                            <Field
                                id={'grid-password'}
                                name="password"
                                type="password"
                                required={true}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="**********"
                            />
                            <ErrorMessage name="password" render={renderError} />
                        </div>
                    </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-phone">
                            Numéro de téléphone*
                        </label>
                        <Field
                            id={'grid-phone'}
                            name="phone"
                            type="text"
                            required={true}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="0707070707"
                        />
                        <ErrorMessage name="phone" render={renderError} />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-adresse">
                            Adresse*
                        </label>

                            <Field
                                id={'grid-adresse'}
                                name="adresse"
                                type="text"
                                required={true}
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="5 rue de pierre mauroy 59000 Lille"
                                value={values.adresse}
                                onChange={(e) => {
                                    handleChange("adresse")
                                    setFieldValue('adresse', e.currentTarget.value)
                                    adresse(values.adresse)
                                }}
                            />

                        {
                            suggestions ? (
                                    <ul>
                                        {suggestions.map((adress, index) => (
                                        <li className={'hover:bg-gray-400'} key={index}>{adress.label}</li>
                                    ))}
                                    </ul>):null
                        }

                        <ErrorMessage name="adresse" render={renderError} />
                    </div>

                </div>
                <div className={'flex justify-center mt-5'}>
                    <button type={'submit'} className={'shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'}>
                        S'inscrire
                    </button>
                </div>
            </Form>
            )}
        </Formik>
    );

}
export default RegisterSchema