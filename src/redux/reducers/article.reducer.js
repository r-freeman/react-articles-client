import {
    FETCH_ARTICLES_BEGIN,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_FAILURE,
    POST_ARTICLE_BEGIN,
    POST_ARTICLE_SUCCESS,
    POST_ARTICLE_FAILURE,
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

const initialState = {
    articles: [],
    article: {},
    isFetchingArticles: false,
    isPostingArticle: false,
    isPostingComment: false,
    isUpdatingComment: false,
    isDeletingComment: false,
    currentComment: {}
};

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
        case POST_ARTICLE_BEGIN:
            return {...state, isPostingArticle: true};
        case POST_ARTICLE_SUCCESS:
            return {
                ...state,
                articles: action.payload.articles,
                article: action.payload.article,
                isPostingArticle: false
            };
        case POST_ARTICLE_FAILURE:
            return {...state, isPostingArticle: false};
        case POST_COMMENT_BEGIN:
            return {...state, isPostingComment: true};
        case POST_COMMENT_SUCCESS:
            return {
                ...state,
                articles: action.payload,
                isPostingComment: false
            };
        case POST_COMMENT_FAILURE:
            return {...state, isPostingComment: false};
        case SET_CURRENT_COMMENT:
            return {...state, currentComment: action.payload};
        case UPDATE_COMMENT_BEGIN:
            return {...state, isUpdatingComment: true};
        case UPDATE_COMMENT_SUCCESS:
            return {
                ...state,
                articles: action.payload.newArticles,
                isUpdatingComment: false,
                currentComment: action.payload.comment
            };
        case UPDATE_COMMENT_FAILURE:
            return {...state, isUpdatingComment: false};
        case DELETE_COMMENT_BEGIN:
            return {...state, isDeletingComment: true};
        case DELETE_COMMENT_SUCCESS:
            return {
                ...state,
                articles: action.payload,
                isDeletingComment: false,
                currentComment: {}
            };
        case DELETE_COMMENT_FAILURE:
            return {...state, isDeletingComment: false};
        default:
            return state;
    }
};

export default articles;