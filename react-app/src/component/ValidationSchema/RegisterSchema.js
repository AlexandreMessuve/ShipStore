import React, {useState} from "react";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage} from "formik";
import axios from "axios";

function  RegisterSchema() {
    const [suggestionsAdresses, setSuggestionsAdresses] = useState([]);
    const [suggestionsCities, setSuggestionsCities] = useState([]);
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema = Yup.object().shape({
        email: Yup.string().email().required("L'adresse mail est obligatoire"),
        password: Yup.string()
            .required("Le mot de passe est obligatoire")
            .min(8, "Le mot de passe est trop court, minimum 8 characters.")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "Doit contenir un minimum de 8 charachers et au moins une majuscule, une minuscule, un nombre et un character spécial"),
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

        adresse: Yup.string().required("L'adresse est obligatoire"),

        city: Yup.string()
            .required('La ville est obligatoire'),
        country: Yup.string()
            .required('Le pays est obligatoire')
    });
    const initialUserSignUp = {
        email: "",
        password:"",
        firstname:"",
        lastname:"",
        phone:"",
        adresse:"",
        city:"",
        postalCode:"",
        country:"",

    }
    let message = "";
    const onSubmit = (values) => {
        axios.post("http://localhost:8000/api/register",
            {
                email: values.email,
                plainPassword: values.password,
                firstname: values.firstname,
                lastname: values.lastname,
                phone: values.phone,
                adresse: values.adresse,
                city: values.city,
                postalCode: values.postalCode,
                country: values.country
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
                if (err.response){
                    if(err.response.data === 'error'){
                        alert('Erreur avec le serveur')
                    }else if(err.response.data === 'error email'){
                        alert('Adresse email déjà enregistré')
                    }
                }
                }

            )

    }

    const adresse = (value) => {
            axios.get('https://api-adresse.data.gouv.fr/search/?q='+value).then((response) => {
                const adresses = response.data.features.map((feature) => ({
                    name: feature.properties.name,
                }));

                const newAdresses = adresses.filter((item, index, self) => {
                    return self.findIndex((t) => t.name === item.name) === index;
                })
                setSuggestionsAdresses(newAdresses)

        }).catch(err => {
            setSuggestionsAdresses([])
            console.error(err)
        })

    }

    const city = (value) => {
        if (value){
            if (value.length > 2){
                axios.get('https://geo.api.gouv.fr/communes?nom='+value+'&fields=nom,code,codesPostaux&format=json&geometry=centre')
                    .then((response) => {
                        setSuggestionsCities(response.data)
                    }).catch(err => {
                    console.error(err)
                })
            }else{
                setSuggestionsCities([])
            }
        }


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
            <Form className={'w-full mx-40 h-full p-10 px-10 border-2'}>
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
                                placeholder="5 rue de pierre mauroy"
                                value={values.adresse}
                                onChange={(e) => {
                                    handleChange("adresse")
                                    setFieldValue('adresse', e.currentTarget.value)
                                    adresse(e.currentTarget.value)
                                }}
                            />

                        {
                            suggestionsAdresses.length > 0 ? (
                                    <ul className={'border-2 border-gray-300 absolute z-50 overflow-auto bg-white'}>
                                        {suggestionsAdresses.map((adress, index) => (
                                        <li onClick={() =>  {
                                            setFieldValue('adresse', adress.name)
                                            setSuggestionsAdresses([])
                                        }} className={'hover:bg-gray-400 w-full pr-96 max-lg:pr-10 max-md:pr-10'} key={index}>{adress.name}</li>
                                    ))}
                                    </ul>):null
                        }

                        <ErrorMessage name="adresse" render={renderError} />
                    </div>

                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                            Ville*
                        </label>

                        <Field
                            id={'grid-city'}
                            name="city"
                            type="text"
                            required={true}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="Paris"
                            value={values.city}
                            onChange={(e) => {
                                handleChange("city")
                                setFieldValue('city', e.currentTarget.value)
                                city(e.currentTarget.value)
                            }}
                        />
                        {
                            suggestionsCities.length > 0 ? (
                                <ul className={'border-2 border-gray-300 absolute z-50 overflow-auto bg-white max-h-28'}>
                                    {suggestionsCities.map((city, index) => (
                                        <li onClick={() =>  {
                                            setFieldValue('city', city.nom)
                                            setFieldValue('postalCode', city.codesPostaux[0])
                                            setSuggestionsCities([])
                                        }} className={'hover:bg-gray-400 w-full pr-44 max-lg:pr-7 max-md:pr-10'} key={index}>{city.nom}</li>
                                    ))}
                                </ul>):null
                        }
                        <ErrorMessage name="city" render={renderError} />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="{'grid-postalCode'}">
                            Code postal*
                        </label>

                        <Field
                            id={'grid-postalCode'}
                            name="postalCode"
                            type="text"
                            required={true}
                            disabled={true}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="75000"
                            value={values.postalCode}
                        />
                        <ErrorMessage name="postalCode" render={renderError} />
                    </div>
                    <div className="w-full md:w-1/3 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-country">
                            Pays*
                        </label>

                        <Field
                            id={'grid-country'}
                            name="country"
                            type="text"
                            required={true}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            placeholder="France"
                            value={values.country}
                            onChange={(e) => {
                                handleChange("country")
                                setFieldValue('country', e.currentTarget.value)
                            }}
                        />
                        <ErrorMessage name="country" render={renderError} />
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