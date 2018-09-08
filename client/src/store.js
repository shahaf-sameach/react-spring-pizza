import { applyMiddleware, compose, createStore } from 'redux'
import { reducers } from './reducers'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'

export const history = createBrowserHistory()

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
    connectRouter(history)(reducers),
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
        ),
    ),
)