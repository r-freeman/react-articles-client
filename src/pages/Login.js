import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useFormik} from 'formik';
import {NavLink, useHistory} from 'react-router-dom';
import actions from '../redux/actions';

import Nav from '../components/Nav';

function Login() {
    const {isLoggedIn, isAuthenticating} = useSelector(state => state.auth);
    const [loginError, setLoginError] = useState("");
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        if (isLoggedIn) {
            goHome();
        }
    }, [isLoggedIn]);

    const goHome = () => history.push('/home');

    const validate = values => {
        const errors = {};

        if (!values.email) {
            errors.email = 'Email address is required.';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Email address is invalid.';
        }

        if (!values.password) {
            errors.password = 'Password is required.'
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validate,
        onSubmit: ({email, password}) => {
            dispatch(actions.auth.login(email, password))
                .then(status => {
                    dispatch(actions.articles.fetchArticles());
                    setLoginError(status);
                    formik.resetForm();
                    goHome();
                })
                .catch(err => {
                    setLoginError(err);
                });
        }
    })

    return (
        <div>
            <header>
                <Nav/>
            </header>
            <div className="sm:min-h-screen flex items-center justify-center bg-white px-8">
                <div className="mx-auto w-full max-w-md mt-20 sm:-mt-48">
                    <div>
                        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 text-center">
                            Log in to your account
                        </h2>
                    </div>
                    <div className="mt-8">
                        <div className="mt-6">
                            <form action="#" className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email address
                                    </label>
                                    <div className="mt-1 relative">
                                        <input id="email"
                                               name="email"
                                               type="email"
                                               autoComplete="email"
                                               required
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                               value={formik.values.email}
                                               className={`${(formik.touched.email && formik.errors.email)
                                                   ? 'border-red-500'
                                                   : (formik.touched.email && !formik.errors.email)
                                                       ? 'border-green-500'
                                                       : 'border-gray-300'} appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}/>
                                        {(formik.touched.email && formik.errors.email) ? <div
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            : (formik.touched.email && !formik.errors.email) && <div
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-green-500" fill="none"
                                                 stroke="currentColor"
                                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                        }
                                    </div>
                                    {(formik.touched.email && formik.errors.email) &&
                                    <p className="mt-2 text-sm font-medium text-red-500"
                                       id="email-error">{formik.errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1 relative">
                                        <input id="password"
                                               name="password"
                                               type="password"
                                               autoComplete="current-password"
                                               required
                                               onChange={formik.handleChange}
                                               onBlur={formik.handleBlur}
                                               value={formik.values.password}
                                               className={`${(formik.touched.password && formik.errors.password)
                                                   ? 'border-red-500'
                                                   : (formik.touched.password && !formik.errors.password)
                                                       ? 'border-green-500'
                                                       : 'border-gray-300'} appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}/>
                                        {(formik.touched.password && formik.errors.password) ? <div
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                                <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                                     viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                    <path fillRule="evenodd"
                                                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                          clipRule="evenodd"/>
                                                </svg>
                                            </div>
                                            : (formik.touched.password && !formik.errors.password) && <div
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <svg className="h-5 w-5 text-green-500" fill="none"
                                                 stroke="currentColor"
                                                 viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                            </svg>
                                        </div>
                                        }
                                    </div>
                                    {(formik.touched.password && formik.errors.password) &&
                                    <p className="mt-2 text-sm font-medium text-red-500"
                                       id="password-error">{formik.errors.password}</p>}
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input id="remember_me" name="remember_me" type="checkbox"
                                               className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"/>
                                        <label htmlFor="remember_me"
                                               className="ml-2 block text-sm text-gray-900">
                                            Remember me
                                        </label>
                                    </div>
                                    <div className="text-sm">
                                        <NavLink to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                                            Forgot your password?
                                        </NavLink>
                                    </div>
                                </div>
                                {loginError &&
                                <p className="mt-2 text-sm font-medium text-red-500"
                                   id="login-error">{loginError}</p>
                                }
                                <div>
                                    <button type="submit"
                                            className="w-full inline-flex items-center justify-center px-4 py-2 leading-tight border border-transparent text-base sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={formik.handleSubmit}
                                            disabled={isAuthenticating}>
                                        {isAuthenticating
                                            ? <svg className="animate-spin inline-flex h-5 w-5 text-white"
                                                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                            : <span className="h-5">Sign in</span>
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;