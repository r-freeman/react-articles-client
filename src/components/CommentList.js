import React from 'react';
import {useSelector} from 'react-redux';
import CommentItem from './CommentItem';

function CommentList() {
    const {article} = useSelector(state => state.articles);

    const hasComments = (Object.keys(article).length > 0 && article.comments.length > 0);

    return (
        <React.Fragment>
            {hasComments
                ? <ul className="space-y-8 mt-4">
                    {article.comments.map((comment) =>
                        <CommentItem comment={comment} key={comment._id}/>
                    )}
                </ul>
                : <p className="mt-4 text-sm text-medium text-center text-gray-500">This article has no
                    comments.</p>
            }
        </React.Fragment>
    )
}

export default CommentList;