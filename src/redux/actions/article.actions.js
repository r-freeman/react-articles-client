import {
    FETCH_ARTICLES_BEGIN,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE
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

export const articles = {fetchArticles};