import React from 'react';

import Nav from '../components/Nav';
import ArticleList from '../components/ArticleList';

function Home() {
    return (
        <div>
            <Nav/>
            <div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
                <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
                    <div>
                        <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">Latest</h2>
                        <div className="mt-3 sm:mt-4">
                            <p className="text-xl text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit. Aspernatur deserunt dolores doloribus iure magnam nam quod saepe sunt tenetur
                                voluptate!</p>
                        </div>
                    </div>
                    <ArticleList/>
                </div>
            </div>
        </div>
    )
}

export default Home;