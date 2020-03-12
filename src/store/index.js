import { createStore , combineReducers} from 'redux'

import homeReducer from './reducers/homeReducer'

const rootReducer = combineReducers({
    homeReducer: homeReducer,
}) 

const store = createStore(rootReducer);

export default store;
