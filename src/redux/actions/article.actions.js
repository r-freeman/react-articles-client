import {
    FETCH_ARTICLES_BEGIN,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_FAILURE,
    POST_COMMENT_BEGIN,
    POST_COMMENT_SUCCESS,
    POST_COMMENT_FAILURE
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
        const {article} = getState().articles;

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

            dispatch({type: POST_COMMENT_SUCCESS, payload: comment});
        }
    } catch (err) {
        console.log(err);
        dispatch({type: POST_COMMENT_FAILURE});
    }
}

export const articles = {fetchArticles, fetchArticle, postComment};