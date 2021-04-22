import React from 'react';

function CommentItem({comment}) {
    return (
        <React.Fragment>
            <li key={comment._id}>
                <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src={comment.author.photo}
                             alt={comment.author.name}/>
                    </div>
                    <div>
                        <div className="text-sm">
                            <p className="font-medium text-gray-900">
                                {comment.author.name}
                            </p>
                        </div>
                        <div className="mt-1 text-sm text-gray-700">
                            <p className="whitespace-pre-wrap">{comment.body}</p>
                        </div>
                        <div className="mt-2 text-sm space-x-2">
                            <span className="text-gray-500 font-medium">4d ago</span>
                        </div>
                    </div>
                </div>
            </li>
        </React.Fragment>
    )
}

export default CommentItem;