import { createStore , combineReducers} from 'redux'

import homeReducer from './reducers/homeReducer'
import dataReducer from './reducers/dataReducer'


const rootReducer = combineReducers({
    homeReducer: homeReducer,
    dataReducer: dataReducer,
}) 

const store = createStore(rootReducer);

export default store;
