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

const initialState = {articles: [], article: {}, isFetchingArticles: false, isPostingComment: false};

const articles = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ARTICLES_BEGIN:
            return {...state, isFetchingArticles: true};
        case FETCH_ARTICLES_SUCCESS:
            return {...state, articles: action.payload, isFetchingArticles: false};
        case FETCH_ARTICLES_FAILURE:
            return initialState;
        case FETCH_ARTICLE_SUCCESS:
            return {...state, article: action.payload}
        case FETCH_ARTICLE_FAILURE:
            return {...state, article: {}};
        case POST_COMMENT_BEGIN:
            return {...state, isPostingComment: true};
        case POST_COMMENT_SUCCESS:
            const {article} = state;
            const comment = action.payload;

            article.comments.push(comment);

            return {...state, article, isPostingComment: false};
        case POST_COMMENT_FAILURE:
            return {...state, isPostingComment: false};
        default:
            return state;
    }
};

export default articles;