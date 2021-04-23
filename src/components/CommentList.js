import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import CommentItem from './CommentItem';
import DeleteCommentModal from './DeleteCommentModal';

function CommentList() {
    const [deleteCommentModal, setDeleteCommentModal] = useState(false);
    const {article} = useSelector(state => state.articles);

    const toggleDeleteCommentModal = () => setDeleteCommentModal(!deleteCommentModal);
    const hasComments = (Object.keys(article).length > 0 && article.comments.length > 0);

    return (
        <React.Fragment>
            {hasComments
                ?
                <React.Fragment>
                    {deleteCommentModal &&
                    <DeleteCommentModal
                        toggleDeleteCommentModal={toggleDeleteCommentModal}/>
                    }
                    <ul className="space-y-8 mt-4">
                        {article.comments.map((comment) =>
                            <CommentItem
                                comment={comment}
                                key={comment._id}
                                toggleDeleteCommentModal={toggleDeleteCommentModal}
                            />
                        )}
                    </ul>
                </React.Fragment>
                : <p className="mt-4 text-sm text-medium text-center text-gray-500">This article has no
                    comments.</p>
            }
        </React.Fragment>
    )
}

export default CommentList;