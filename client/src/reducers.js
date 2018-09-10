import { combineReducers } from 'redux';
import { reducer as loginReducer} from './components/login/login.reducer';
import { reducer as ProgressReducer } from './components/progressBar/progressBar.reducer';
import { reducer as OrderFormReducer } from './components/form/OrderForm.reducer'
import { reducer as OrderReducer} from './components/order/order.reducer'


export const reducers = combineReducers({
    ProgressReducer,
    loginReducer,
    OrderFormReducer,
    OrderReducer
    });
