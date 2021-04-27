import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useFormik} from 'formik';

import actions from '../redux/actions';

import Nav from '../components/Nav';

function CreateArticle() {
    const {isLoggedIn} = useSelector(state => state.auth);
    const {isPostingArticle} = useSelector(state => state.articles);
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        if (!isLoggedIn) {
            goHome();
        }
    }, [isLoggedIn]);

    const goHome = () => history.push('/home');

    const validate = values => {
        const errors = {};

        if (!values.title) {
            errors.title = 'Title is required.';
        }

        if (!values.excerpt) {
            errors.excerpt = 'Excerpt is required.'
        }

        if (!values.content) {
            errors.content = 'Content is required.'
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            excerpt: '',
            content: ''
        },
        validate,
        onSubmit: ({title, excerpt, content}) => {
            dispatch(actions.articles.postArticle({title, excerpt, content}))
                .then(article => {
                    formik.resetForm();
                    // redirect to the new article
                    history.push(`/articles/${article.slug}`);
                }).catch(err => {
                console.log(err);
            })
        }
    })

    return (
        <div>
            <header>
                <Nav/>
            </header>
            <div className="mx-auto max-w-3xl sm:my-24 px-8 my-16">
                <form action="#" className="space-y-8">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Create article</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi dicta fugiat non quo
                            velit voluptates.
                        </p>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-full">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm relative">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.title}
                                    className={`${(formik.touched.title && formik.errors.title)
                                        ? 'border-red-500'
                                        : (formik.touched.title && !formik.errors.title)
                                            ? 'border-green-500'
                                            : 'border-gray-300'} flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm pr-10`}
                                />
                                {(formik.touched.title && formik.errors.title) ? <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    : (formik.touched.title && !formik.errors.title) && <div
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
                            {(formik.touched.title && formik.errors.title) &&
                            <p className="mt-2 text-sm font-medium text-red-500"
                               id="title-error">{formik.errors.title}</p>}
                        </div>
                        <div className="sm:col-span-full">
                            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                                Excerpt
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm relative">
                                <input
                                    type="text"
                                    name="excerpt"
                                    id="excerpt"
                                    required
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.excerpt}
                                    className={`${(formik.touched.excerpt && formik.errors.excerpt)
                                        ? 'border-red-500'
                                        : (formik.touched.excerpt && !formik.errors.excerpt)
                                            ? 'border-green-500'
                                            : 'border-gray-300'} flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm pr-10`}
                                />
                                {(formik.touched.excerpt && formik.errors.excerpt) ? <div
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                    : (formik.touched.excerpt && !formik.errors.excerpt) && <div
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
                            {(formik.touched.excerpt && formik.errors.excerpt) &&
                            <p className="mt-2 text-sm font-medium text-red-500"
                               id="excerpt-error">{formik.errors.excerpt}</p>}
                        </div>
                        <div className="sm:col-span-full">
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                                Content
                            </label>
                            <div className="mt-1">
                                        <textarea
                                            id="content"
                                            name="content"
                                            rows="10"
                                            required
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.content}
                                            className={`${(formik.touched.content && formik.errors.content)
                                                ? 'border-red-500'
                                                : (formik.touched.content && !formik.errors.content)
                                                    ? 'border-green-500'
                                                    : 'border-gray-300'} flex-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full min-w-0 rounded-md sm:text-sm`}
                                        />
                            </div>
                            {(formik.touched.content && formik.errors.content) &&
                            <p className="mt-2 text-sm font-medium text-red-500"
                               id="content-error">{formik.errors.content}</p>}
                        </div>
                    </div>
                    <div className="mt-3 sm:flex sm:flex-row-reverse items-center">
                        <button
                            type="submit"
                            className="sm:ml-3 sm:w-20 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-base sm:text-sm leading-tight font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={formik.handleSubmit}
                            disabled={isPostingArticle}>
                            {isPostingArticle
                                ? <svg className="animate-spin inline-flex h-5 w-5 text-white"
                                       xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10"
                                            stroke="currentColor" strokeWidth="4"/>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                </svg>
                                : <span className="h-5">Publish</span>
                            }
                        </button>
                        <button
                            type="button"
                            className="sm:w-20 mt-3 sm:mt-0 w-full bg-white inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-base sm:text-sm leading-tight font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={goHome}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateArticle;