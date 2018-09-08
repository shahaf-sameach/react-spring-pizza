import { combineReducers } from 'redux';
import {reducer as loginReducer} from './components/login/login.reducer';
import {reducer as ProgressReducer} from './components/progressBar/progressBar.reducer';


export const reducers = combineReducers({ProgressReducer, loginReducer});
