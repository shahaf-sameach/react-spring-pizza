import { createStore } from 'redux'
import {reducers} from './reducers'
import { connectRouter } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()

export const store = createStore(connectRouter(history)(reducers));

