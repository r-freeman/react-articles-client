import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import actions from '../redux/actions';

import Nav from '../components/Nav';

function Article() {
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
                        <p className="mt-8 text-xl text-gray-500 leading-8">
                            {article.excerpt}
                        </p>
                    </div>
                    <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
                        <p className="whitespace-pre-wrap">
                            {article.body}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Article;