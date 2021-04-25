import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import actions from '../redux/actions';
import {useFormik} from 'formik';

function UpdateCommentModal({toggleUpdateCommentModal}) {
    const {user} = useSelector(state => state.auth);
    const {currentComment, isUpdatingComment} = useSelector(state => state.articles);
    const dispatch = useDispatch();

    const validate = values => {
        const errors = {};

        if (!values.comment) {
            errors.comment = 'Comment is required.';
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
            comment: currentComment.body
        },
        validate,
        onSubmit: async values => {
            await dispatch(actions.articles.updateComment(values.comment));
            formik.resetForm();
            toggleUpdateCommentModal();
        }
    });


    return (
        <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog"
             aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" aria-hidden="true"
                     onClick={toggleUpdateCommentModal}/>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div
                    className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 w-full text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                    <div>
                        <div className="mt-3 text-center sm:mt-0">
                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                Update comment
                            </h3>
                            <div className="mt-8">
                                <div className="flex space-x-3">
                                    {user &&
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full"
                                             src={user.photo}
                                             alt={user.name}/>
                                    </div>
                                    }
                                    <div className="min-w-0 flex-1">
                                        <form action="#">
                                            <div>
                                                <label htmlFor="comment" className="sr-only">Write a comment.</label>
                                                <textarea id="comment"
                                                          name="comment"
                                                          rows="5"
                                                          className={`${formik.errors.comment ? 'border-red-500' : 'border-gray-300'} shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500  sm:text-sm  bg-gray-50 rounded-md`}
                                                          placeholder="Write a comment."
                                                          onChange={formik.handleChange}
                                                          value={formik.values.comment}
                                                />
                                                {formik.errors.comment &&
                                                <div className="flex justify-start">
                                                    <div
                                                        className="inline-flex items-center text-red-500 sm:hidden my-3">
                                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                                             viewBox="0 0 24 24"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth="2"
                                                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                        </svg>
                                                        <p className="text-sm font-medium">{formik.errors.comment}</p>
                                                    </div>
                                                </div>
                                                }
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div
                                    className="mt-3 sm:flex sm:flex-row-reverse items-center">
                                    <button type="submit"
                                            className="w-full sm:w-20 inline-flex items-center justify-center px-4 py-2 border border-transparent sm:ml-3 text-base sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                            onClick={formik.handleSubmit}
                                            disabled={isUpdatingComment}
                                    >
                                        {isUpdatingComment
                                            ? <svg className="animate-spin inline-flex h-5 w-5 text-white"
                                                   xmlns="http://www.w3.org/2000/svg" fill="none"
                                                   viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10"
                                                        stroke="currentColor" strokeWidth="4"/>
                                                <path className="opacity-75" fill="currentColor"
                                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                            </svg>
                                            : <span className="h-5">Update</span>
                                        }
                                    </button>
                                    <button type="button"
                                            className="mt-3 w-full sm:w-20 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
                                            onClick={toggleUpdateCommentModal}
                                    >
                                        Cancel
                                    </button>
                                    {formik.errors.comment &&
                                    <div className="sm:inline-flex items-center text-red-500 mx-auto sm:ml-12 hidden">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor"
                                             viewBox="0 0 24 24"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <p className="text-sm font-medium">{formik.errors.comment}</p>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCommentModal;