import {
    FETCH_ARTICLES_BEGIN,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_FAILURE
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

export const articles = {fetchArticles, fetchArticle};