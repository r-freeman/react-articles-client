import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import actions from '../redux/actions';

function CommentInput() {
    const {user} = useSelector(state => state.auth);
    const {isPostingComment} = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const commentInput = useRef();

    async function handleCommentSubmit(e) {
        e.preventDefault();

        const comment = commentInput.current.value;
        await dispatch(actions.articles.postComment(comment));
    }

    return (
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
                            <textarea id="comment" name="comment" rows="5"
                                      className="shadow-sm block w-full focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 bg-gray-50 rounded-md"
                                      placeholder="Write a comment."
                                      ref={commentInput}/>
                        </div>
                        <div className="mt-3 flex justify-end">
                            <button type="submit"
                                    className="w-full sm:w-36 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleCommentSubmit}>
                                {isPostingComment
                                    ? <svg className="animate-spin inline-flex h-5 w-5 text-white"
                                           xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10"
                                                stroke="currentColor" strokeWidth="4"/>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                    </svg>
                                    : <span className="h-5">Post comment</span>
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CommentInput;