import React from 'react';
import {NavLink} from 'react-router-dom';

function ArticleItem({article}) {
    const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    return (
        <div>
            <p className="text-sm text-gray-500">
                <time
                    dateTime={new Date().toLocaleDateString(undefined, dateOptions)}>
                    {new Date().toLocaleDateString(undefined, dateOptions)}
                </time>
            </p>
            <a href="#" className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">{article.title}</p>
                <p className="mt-3 text-base text-gray-500">{article.body}</p>
            </a>
            <div className="mt-3">
                <NavLink to=""
                         className="text-base font-semibold text-indigo-600 hover:text-indigo-500">
                    Read full story
                </NavLink>
            </div>
        </div>
    )
}

export default ArticleItem;