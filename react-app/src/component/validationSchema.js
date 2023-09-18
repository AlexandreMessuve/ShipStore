import React from "react";
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

function  ValidationSchema() {
    const userSchema = Yup.object({
        email: Yup.string().email().required(),
        password: Yup.string().required(),
    })

    const initialUserSignIn = {
        email: "",
        password:""
    }

    const onSubmit = (values) => {

        console.log(values)
        axios.post("http://localhost:8000/api/login",
            {
            email: values.email,
            password: values.password
        })
            .then(res => sessionStorage.setItem('tokens', JSON.stringify(res.data)))
            .catch(err => console.log(err))
    };

    const renderError = (message) => <p className="help is-danger">{message}</p>;

    return (
        <Formik
            initialValues={initialUserSignIn}
            validationSchema={userSchema}
            onSubmit={async (values, { resetForm }) => {
                await onSubmit(values);
                resetForm();
            }}
        >
            <Form>
                <div
                    className="container"
                    style={{
                        width: "60%",
                    }}
                >
                    <div className="field">
                        <label className="label" htmlFor="email">
                            Email address
                        </label>
                        <div className="control">
                            <Field
                                name="email"
                                type="text"
                                className="input"
                                placeholder="Email address"
                            />
                            <ErrorMessage name="email" render={renderError} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label" htmlFor="password">
                            Password
                        </label>
                        <div className="control">
                            <Field
                                name="password"
                                type="password"
                                className="input"
                                placeholder="Password"
                            />
                            <ErrorMessage name="password" render={renderError} />
                        </div>
                    </div>
                    <button type="submit" className="button is-primary">
                        Submit
                    </button>
                </div>
            </Form>
        </Formik>
    );

}
export default ValidationSchema