import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import actions from '../redux/actions';

function CommentInput() {
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const commentInput = useRef();

    function handleCommentSubmit(e) {
        e.preventDefault();

        const comment = commentInput.current.value;
        dispatch(actions.articles.postComment(comment));
    }

    //
    // function handleCommentReply() {
    //     commentInput.current.focus();
    // }

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
                                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={handleCommentSubmit}>
                                Post comment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CommentInput;