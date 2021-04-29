import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams, NavLink} from 'react-router-dom';
import useScrollBlock from '../hooks/useScrollBlock';
import actions from '../redux/actions';

import Nav from '../components/Nav';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';
import DeleteArticleModal from '../components/DeleteArticleModal';

function Article() {
    const [deleteArticleModal, setDeleteArticleModal] = useState(false);
    const {isLoggedIn} = useSelector(state => state.auth);
    const {article} = useSelector(state => state.articles);
    const dispatch = useDispatch();
    const [blockScroll, allowScroll] = useScrollBlock();

    let {slug} = useParams();

    useEffect(() => {
        dispatch(actions.articles.fetchArticle(slug));
    }, [dispatch, slug]);

    const toggleDeleteArticleModal = () => {
        setDeleteArticleModal(!deleteArticleModal);

        if (deleteArticleModal) {
            allowScroll();
        } else {
            blockScroll();
        }
    };

    return (
        <div>
            <header>
                <Nav/>
            </header>
            {deleteArticleModal &&
            <DeleteArticleModal
                toggleDeleteArticleModal={toggleDeleteArticleModal}/>
            }
            <div className="bg-white py-16 overflow-hidden relative">
                <div className="-mt-4 mb-8 md:absolute md:top-0 md:right-0 md:p-10 md:my-auto">
                    {isLoggedIn &&
                    <div className="flex justify-center">
                            <span className="relative z-0 inline-flex shadow-sm rounded-md -space-x-px">
                              <NavLink to="/edit-article"
                                       className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                <span className="sr-only">Edit</span>
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                       fill="currentColor"
                                       aria-hidden="true">
                                  <path
                                      d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                                </svg>
                              </NavLink>
                              <button type="button"
                                      className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                      onClick={toggleDeleteArticleModal}
                              >
                                <span className="sr-only">Delete</span>
                                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                       fill="currentColor"
                                       aria-hidden="true">
                                  <path fillRule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clipRule="evenodd"/>
                                </svg>
                              </button>
                            </span>
                    </div>
                    }
                </div>

                <div className="px-8">
                    <div className="text-lg max-w-prose mx-auto">
                        <h1>
                            {article.category &&
                            <span
                                className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                                {article.category.name}
                            </span>
                            }
                            <span
                                className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                              {article.title}
                            </span>
                        </h1>
                        {article.author &&
                        <div className="flex flex-col items-center mt-6 text-center">
                            <img className="mx-auto h-16 w-16 rounded-full"
                                 src={article.author.photo}
                                 alt={article.author.name}/>
                            <div className="mt-1">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">{article.author.name}</h3>
                                </div>
                            </div>
                        </div>
                        }
                        <p className="mt-8 text-xl text-gray-500 leading-8">
                            {article.excerpt}
                        </p>
                    </div>

                    <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                        <p className="whitespace-pre-wrap">
                            {article.body}
                        </p>
                    </div>
                    <section className="mt-10 text-lg max-w-prose mx-auto mb-32">
                        <h2 className="block text-xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl">Comments</h2>
                        <CommentList/>
                        {isLoggedIn &&
                        <CommentInput/>
                        }
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Article;