import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import actions from '../redux/actions';

import Nav from '../components/Nav';
import CommentList from '../components/CommentList';
import CommentInput from '../components/CommentInput';

function Article() {
    const {isLoggedIn} = useSelector(state => state.auth);
    const {article} = useSelector(state => state.articles);
    const dispatch = useDispatch();
    let {slug} = useParams();

    useEffect(() => {
        dispatch(actions.articles.fetchArticle(slug));
    }, [dispatch, slug]);

    return (
        <div>
            <header>
                <Nav/>
            </header>
            <div className="bg-white py-16 overflow-hidden">
                <div className="px-8">
                    <div className="text-lg max-w-prose mx-auto">
                        <h1>
                            <span
                                className="block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                              Introducing
                            </span>
                            <span
                                className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                              {article.title}
                            </span>
                        </h1>
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