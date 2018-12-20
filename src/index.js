import React from 'react'
import { render } from 'react-dom'
import asyncComponent from "./asyncComponent";
import LoadingComponent from "./LoadingComponent";

// router
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
// redux
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux'
import reducers from './reducers'

let store = createStore(reducers, applyMiddleware(thunk));

/* Import Components */
const AsyncLogin = asyncComponent(() => import("./components/Login"), LoadingComponent);
const AsyncRegister = asyncComponent(() => import("./components/Register"), LoadingComponent);
const AsyncDashboard = asyncComponent(() => import("./components/Dashboard"), LoadingComponent);
import "../assets/style.css";

const PrivateRoute = ({ component: Component , ...rest}) => (
  <Route 
    {...rest}
    render={props =>
      localStorage.getItem('username') ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

render((
  <Provider store={store}>
    <BrowserRouter>
      <div>
		<Switch>
        <Route path="/login" component={AsyncLogin}/>
		<Route path="/register" component={AsyncRegister}/>
        <PrivateRoute exact path="/" component={AsyncDashboard}/>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>), document.getElementById('root'));