import React from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function Login({ setFlag }) {

    const handleLogout = () => {
        localStorage.removeItem("token")
        alert(`logout shodi !!`)
        setFlag(true)
    }

    return (

        <div>
            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email('email not')
                        .required('required'),
                    password: Yup.string()
                        .min(4, '4 character')
                        .required('required')
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setTimeout(() => {
                        const { email, password } = values
                        const user = { email, password }

                        axios.post("http://localhost:5000/api/auth/login",
                            user
                        )
                            .then(res => {
                                console.log(res)
                                localStorage.setItem("token", JSON.stringify({
                                    userLogin: true,
                                    token: res.data.access_token
                                }))
                            })
                            .catch(err => console.log(err))
                        resetForm();
                        setSubmitting(false)
                    }, 400)
                }}
            >
                <Form>

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

                    {/* Button */}
                    <button type='submit'>submit</button>

                    {/* Go To Logout */}
                    <p> click to <a onClick={handleLogout}>logout</a></p>

                    {/* Go To Register */}
                    <p> go to <a onClick={() => setFlag(true)}>register</a></p>


                </Form>

            </Formik>
        </div>
    )
}

export default Login
