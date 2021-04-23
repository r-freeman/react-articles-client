import React, {useState} from 'react';
import {Transition} from '@headlessui/react';
import {useDispatch} from 'react-redux';
import actions from '../redux/actions';

function CommentItem({comment, toggleDeleteCommentModal}) {
    const [commentMenu, setCommentMenu] = useState(false);
    const dispatch = useDispatch();

    const toggleCommentMenu = () => {
        dispatch(actions.articles.setCurrentComment(comment));
        setCommentMenu(!commentMenu);
    }

    return (
        <React.Fragment>
            <li>
                <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src={comment.author.photo}
                             alt={comment.author.name}/>
                    </div>
                    <div className="w-full">
                        <div className="flex justify-between">
                            <p className="font-medium text-gray-900 text-sm">
                                {comment.author.name}
                            </p>
                            <div className="relative inline-block text-left">
                                <div>
                                    <button type="button"
                                            className={`${commentMenu ? 'text-gray-600' : ''} rounded-full flex items-center text-gray-400 hover:text-gray-600 focus:outline-none`}
                                            id="menu-button" aria-expanded="true" aria-haspopup="true"
                                            onClick={toggleCommentMenu}
                                            onBlur={() => setCommentMenu(false)}>
                                        <span className="sr-only">Open options</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                             fill="currentColor" aria-hidden="true">
                                            <path
                                                d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"/>
                                        </svg>
                                    </button>
                                </div>
                                <Transition
                                    show={commentMenu}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        role="menu" aria-orientation="vertical" aria-labelledby="menu-button"
                                        tabIndex="-1">
                                        <div className="py-1" role="none">
                                            <button type="button"
                                                    className="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none"
                                                    role="menuitem"
                                                    tabIndex="-1" id="menu-item-0">Update
                                            </button>
                                            <button type="button"
                                                    className="w-full text-left text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 focus:outline-none"
                                                    role="menuitem"
                                                    tabIndex="-1" id="menu-item-1"
                                                    onClick={toggleDeleteCommentModal}>Delete
                                            </button>
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                            <p className="whitespace-pre-wrap">{comment.body}</p>
                        </div>
                        <div className="mt-2 text-sm space-x-2">
                            <span className="text-gray-500 font-medium">4d ago</span>
                        </div>
                    </div>
                </div>
            </li>
        </React.Fragment>
    )
}

export default CommentItem;