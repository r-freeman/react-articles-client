import {combineReducers} from 'redux';
import auth from './auth.reducer';
import articles from './article.reducer';

const rootReducer = combineReducers({
    auth,
    articles
});

export default rootReducer;