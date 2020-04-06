import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import reduxPromise from 'redux-promise';
import logger from 'redux-logger';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createHistory as history } from 'history';
import CarIndex from './containers/car-index';
import '../assets/stylesheets/application.scss';
import carReducer from './reducers/carReducer';
import { reducer as formReducer } from 'redux-form';
import CarNew from './containers/car_new';

const garageName = prompt("What is your garage?") || `garage${Math.floor(10 + (Math.random() * 90))}`;
const initialState = {
  garage: garageName,
  cars: []
};

const reducers = combineReducers({
  // key: reducer
  garage: (state = null, action) => state,
  cars: carReducer,
  form: formReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewares = composeEnhancers(applyMiddleware(reduxPromise, logger));
const store = createStore(reducers, initialState, middlewares);

// render an instance of the component in the DOM
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={CarIndex} />
        <Route path="/new" exact component={CarNew} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
