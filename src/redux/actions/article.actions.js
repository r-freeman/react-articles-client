import {
    FETCH_ARTICLES_BEGIN,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_FAILURE,
    POST_ARTICLE_BEGIN,
    POST_ARTICLE_SUCCESS,
    POST_ARTICLE_FAILURE,
    DELETE_ARTICLE_BEGIN,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_FAILURE,
    POST_COMMENT_BEGIN,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAILURE,
    SET_CURRENT_COMMENT,
    UPDATE_COMMENT_BEGIN,
    UPDATE_COMMENT_SUCCESS,
    UPDATE_COMMENT_FAILURE,
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

const fetchArticle = (slug) => (dispatch, getState) => {
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

const postArticle = ({title, excerpt, content}) => (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        dispatch({type: POST_ARTICLE_BEGIN});

        const {_id, name, photo} = getState().auth.user;
        const {articles} = getState().articles;

        fetch('http://localhost:4000/api/v1/articles', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, excerpt, body: content, author_id: _id})
        }).then(response => response.json()
            .then(res => {
                if (response.status === 201) {
                    const article = res;

                    article.author = {_id, name, photo};

                    // replace articles with a new set of articles containing the new article
                    const newArticles = articles;
                    newArticles.push(article)

                    dispatch({type: POST_ARTICLE_SUCCESS, payload: {articles: newArticles, article}});
                    resolve(article);
                } else {
                    dispatch({type: POST_ARTICLE_FAILURE});
                    reject("Something went wrong.");
                }
            })).catch(err => {
            dispatch({type: POST_ARTICLE_FAILURE});
            reject(err);
        });
    });
}

const deleteArticle = (article) => async (dispatch, getState) => {
    try {
        dispatch({type: DELETE_ARTICLE_BEGIN});

        const {articles} = getState().articles;

        const request = await fetch(`http://localhost:4000/api/v1/articles/${article._id}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (request.status === 204) {
            // find the index of the article in the articles array
            const articleIndex = articles.findIndex(a => a.id === article._id);

            // replace articles with a new set of articles, removing the delete article
            const newArticles = articles;
            newArticles.splice(articleIndex, 1);

            dispatch({type: DELETE_ARTICLE_SUCCESS, payload: newArticles});
        } else {
            dispatch({type: DELETE_ARTICLE_FAILURE});
        }
    } catch (err) {
        console.log(err);
        dispatch({type: DELETE_ARTICLE_FAILURE});
    }
}

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

const updateComment = (comment) => async (dispatch, getState) => {
    try {
        dispatch({type: UPDATE_COMMENT_BEGIN});

        const {_id, name, photo} = getState().auth.user;
        const {article, articles, currentComment} = getState().articles;

        const request = await fetch(`http://localhost:4000/api/v1/comments/${currentComment._id}`, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({body: comment})
        });

        if (request.status === 200) {
            const comment = await request.json();
            comment.author = {_id, name, photo};

            // find the index of the article in the articles array
            const articleIndex = articles.findIndex(a => a.id === article.id);

            // find the index of the comment in article.comments
            const commentIndex = articles[articleIndex].comments.findIndex(c => c._id === comment._id);

            // replace articles with a new set of articles and splice in the updated comment
            const newArticles = articles;
            newArticles[articleIndex].comments.splice(commentIndex, 1, comment);

            dispatch({type: UPDATE_COMMENT_SUCCESS, payload: {newArticles, comment}});
        } else {
            dispatch({type: UPDATE_COMMENT_FAILURE});
        }
    } catch (err) {
        console.log(err);
        dispatch({type: UPDATE_COMMENT_FAILURE});
    }
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
    postArticle,
    deleteArticle,
    postComment,
    setCurrentComment,
    updateComment,
    deleteComment
};