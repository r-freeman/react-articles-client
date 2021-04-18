import React from 'react';

import Nav from '../components/Nav';
import ArticleList from '../components/ArticleList';

function Articles() {
    return (
        <div>
            <header>
                <Nav/>
            </header>
            <div className="bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 px-8">
                <div className="relative max-w-full mx-auto divide-y-2 divide-gray-200">
                    <div>
                        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Articles</h2>
                        <div className="mt-3 sm:mt-4">
                            <p className="text-xl text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit. Dolor eveniet facere, facilis reprehenderit sapiente tempora!</p>
                        </div>
                    </div>
                    <ArticleList/>
                </div>
            </div>
        </div>
    )
}

export default Articles;