import React from 'react';
import {useSelector} from 'react-redux';
import ArticleItem from './ArticleItem';

function ArticleList() {
    const {articles} = useSelector(state => state.articles);

    return (
        <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {articles.map(article => (
                <ArticleItem article={article} key={article._id}/>
            ))}
        </div>
    );
}

export default ArticleList;