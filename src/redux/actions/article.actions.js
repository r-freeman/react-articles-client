import {
    FETCH_ARTICLES_BEGIN,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_FAILURE,
    POST_COMMENT_BEGIN,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAILURE,
    SET_CURRENT_COMMENT,
    DELETE_COMMENT_BEGIN,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE
} from '../types';

const fetchArticles = () => async (dispatch) => {
    try {
        dispatch({type: FETCH_ARTICLES_BEGIN});

        const request = await fetch('http://localhost:4000/api/v1/articles', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
            }
        });

        if (request.status === 200) {
            const articles = await request.json();

            dispatch({type: FETCH_ARTICLES_SUCCESS, payload: articles});
        } else {
            dispatch({type: FETCH_ARTICLES_FAILURE});
        }
    } catch (err) {
        console.log(err);
        dispatch({type: FETCH_ARTICLES_FAILURE});
    }
};

const fetchArticle = (slug) => async (dispatch, getState) => {
    try {
        const article = getState().articles.articles.find(article => article.slug === slug);

        if (typeof article !== 'undefined') {
            dispatch({type: FETCH_ARTICLE_SUCCESS, payload: article});
        } else {
            dispatch({type: FETCH_ARTICLE_FAILURE});
        }
    } catch (err) {
        console.log(err);
        dispatch({type: FETCH_ARTICLE_FAILURE});
    }
};

const postComment = (comment) => async (dispatch, getState) => {
    try {
        dispatch({type: POST_COMMENT_BEGIN});

        const {_id, name, photo} = getState().auth.user;
        const {article, articles} = getState().articles;

        const request = await fetch('http://localhost:4000/api/v1/comments', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({body: comment, author_id: _id, article_id: article._id})
        });

        if (request.status === 201) {
            const comment = await request.json();
            comment.author = {_id, name, photo};

            // find the index of the article in the articles array
            const articleIndex = articles.findIndex(a => a.id === article.id);

            // replace articles with a new set of articles containing the new comment
            const newArticles = articles;
            newArticles[articleIndex].comments.push(comment)

            dispatch({type: POST_COMMENT_SUCCESS, payload: newArticles});
        } else {
            dispatch({type: POST_COMMENT_FAILURE});
        }
    } catch (err) {
        console.log(err);
        dispatch({type: POST_COMMENT_FAILURE});
    }
}

const setCurrentComment = (comment) => (dispatch) => {
    dispatch({type: SET_CURRENT_COMMENT, payload: comment});
};

const deleteComment = (comment) => async (dispatch, getState) => {
    try {
        dispatch({type: DELETE_COMMENT_BEGIN});

        const {article, articles} = getState().articles;

        const request = await fetch(`http://localhost:4000/api/v1/comments/${comment._id}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (request.status === 204) {
            // find the index of the article in the articles array
            const articleIndex = articles.findIndex(a => a.id === article.id);

            // find the index of the comment in article.comments
            const commentIndex = articles[articleIndex].comments.findIndex(c => c._id === comment._id);

            // replace articles with a new set of articles, removing the deleted comment with splice
            const newArticles = articles;
            newArticles[articleIndex].comments.splice(commentIndex, 1);

            dispatch({type: DELETE_COMMENT_SUCCESS, payload: newArticles});
        } else {
            dispatch({type: DELETE_COMMENT_FAILURE});
        }
    } catch (err) {
        console.log(err);
        dispatch({type: DELETE_COMMENT_FAILURE});
    }
}

export const articles = {
    fetchArticles,
    fetchArticle,
    postComment,
    setCurrentComment,
    deleteComment
};