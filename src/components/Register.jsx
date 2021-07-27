import React from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function Register({ setFlag }) {

    return (
        <div className='register'>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    password: '',
                    password2: '',
                    privacy: false
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .max(15, 'must be 15 character')
                        .required('required'),
                    lastName: Yup.string()
                        .min(3, 'least 3 character')
                        .required('required'),
                    email: Yup.string()
                        .email('not email')
                        .required('required'),
                    password: Yup.string()
                        .min(4, '4 character')
                        .required('required'),
                    password2: Yup.string()
                        .required('required')
                        .oneOf([Yup.ref('password'), null], 'must be match'),
                    privacy: Yup.boolean()
                        .required('required')
                        .oneOf([true], 'must be true')
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        const { email, password } = values
                        const user = { email, password }

                        axios.post("http://localhost:5000/api/auth/register",
                            user
                        )
                            .then(res => console.log(res))
                            .catch(err => console.log(err))
                        alert(JSON.stringify(values, null, 2));
                        resetForm();
                        setSubmitting(false);
                    }, 400)
                }}
            >

                <Form>

                    {/* First Naem */}
                    <label htmlFor='firstName'>first name</label>
                    <Field name='firstName' type='text' />
                    <ErrorMessage name='firstName' >
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    {/* Last Name */}
                    <label htmlFor='lastName'>last name</label>
                    <Field name='lastName' type='text' />
                    <ErrorMessage name='lastName'>
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    {/* Email */}
                    <label htmlFor='email'>email</label>
                    <Field name='email' type='email' />
                    <ErrorMessage name='email'>
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    {/* Password */}
                    <label htmlFor='password'>password</label>
                    <Field name='password' type='password' />
                    <ErrorMessage name='password'>
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    {/* Password 2 */}
                    <label htmlFor='password2'>confirm password</label>
                    <Field name='password2' type='password' />
                    <ErrorMessage name='password2'>
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    {/* Privacy */}
                    <label htmlFor='privacy'>privacy</label>
                    <Field className='chckbx' name='privacy' type='checkbox' />
                    <ErrorMessage name='privacy'>
                        {msg => <div style={{ color: 'red' }}>{msg}</div>}
                    </ErrorMessage>

                    {/* Submit Button */}
                    <button type='submit'>submit</button>

                    {/* Go To Login */}
                    <p> go to <a onClick={() => setFlag(false)}>login</a></p>

                </Form>

            </Formik>
        </div >
    )
}

export default Register
