import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Switch, Route, useHistory} from 'react-router-dom';
import actions from './redux/actions';

import Home from './pages/Home';
import Login from './pages/Login';
import Article from './pages/Article';
import Articles from './pages/Articles';
import SignUp from './pages/SignUp';

function App() {
    const {isLoggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(actions.auth.fetchUser());
        }
    }, [isLoggedIn, dispatch]);

    useEffect(() => {
        dispatch(actions.articles.fetchArticles());
    }, [dispatch]);

    useEffect(() => {
        history.push('/home');
    }, []);

    return (
        <div className="App">
            <Switch>
                <Route exact path="/home" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={SignUp}/>
                <Route exact path="/articles" component={Articles}/>
                <Route exact path="/articles/:slug" component={Article}/>
            </Switch>
        </div>
    );
}

export default App;
