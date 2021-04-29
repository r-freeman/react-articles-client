import React from 'react';
import {NavLink} from 'react-router-dom';

function ArticleItem({article}) {
    const dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    return (
        <div>
            <NavLink to={`articles/${article.slug}`} className="mt-2 block">
                <h1 className="text-xl font-semibold text-gray-900">
                    <span
                        className="text-sm text-indigo-600 font-semibold tracking-wide uppercase">
                        {article.category.name}
                    </span>
                    <span className="block">{article.title}</span>
                </h1>
                <p className="mt-3 text-base text-gray-500">{article.excerpt}</p>
            </NavLink>
            <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                    <NavLink to={`articles/${article.slug}`}>
                        <span className="sr-only">{article.author.name}</span>
                        <img className="h-10 w-10 rounded-full" src={article.author.photo} alt=""/>
                    </NavLink>
                </div>
                <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">
                        <NavLink to={`articles/${article.slug}`}>{article.author.name}</NavLink>
                    </p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                        <time
                            dateTime={new Date().toLocaleDateString(undefined, dateOptions)}>{new Date().toLocaleDateString(undefined, dateOptions)}</time>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleItem;