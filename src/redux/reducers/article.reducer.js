import {
    FETCH_ARTICLES_BEGIN,
    FETCH_ARTICLES_SUCCESS,
    FETCH_ARTICLES_FAILURE,
    FETCH_AUTHORS_BEGIN,
    FETCH_AUTHORS_SUCCESS,
    FETCH_AUTHORS_FAILURE,
    FETCH_CATEGORIES_BEGIN,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    FETCH_ARTICLE_SUCCESS,
    FETCH_ARTICLE_FAILURE,
    POST_ARTICLE_BEGIN,
    POST_ARTICLE_SUCCESS,
    POST_ARTICLE_FAILURE,
    UPDATE_ARTICLE_BEGIN,
    UPDATE_ARTICLE_SUCCESS,
    UPDATE_ARTICLE_FAILURE,
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

const initialState = {
    articles: [],
    authors: [],
    categories: [],
    article: {},
    isFetchingArticles: false,
    isPostingArticle: false,
    isUpdatingArticle: false,
    isDeletingArticle: false,
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
        case FETCH_AUTHORS_BEGIN:
            return {...state};
        case FETCH_AUTHORS_SUCCESS:
            return {...state, authors: action.payload};
        case FETCH_AUTHORS_FAILURE:
            return {...state, authors: []};
        case FETCH_CATEGORIES_BEGIN:
            return {...state};
        case FETCH_CATEGORIES_SUCCESS:
            return {...state, categories: action.payload};
        case FETCH_CATEGORIES_FAILURE:
            return {...state, categories: []};
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
        case UPDATE_ARTICLE_BEGIN:
            return {...state, isUpdatingArticle: true};
        case UPDATE_ARTICLE_SUCCESS:
            return {
                ...state,
                articles: action.payload.articles,
                article: action.payload.article,
                isUpdatingArticle: false
            };
        case UPDATE_ARTICLE_FAILURE:
            return {...state, isUpdatingArticle: false};
        case DELETE_ARTICLE_BEGIN:
            return {...state, isDeletingArticle: true};
        case DELETE_ARTICLE_SUCCESS:
            return {
                ...state,
                articles: action.payload,
                article: {},
                isDeletingArticle: false
            };
        case DELETE_ARTICLE_FAILURE:
            return {...state, isDeletingArticle: false};
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