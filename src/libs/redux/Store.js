import { composeWithDevTools } from '@redux-devtools/extension'
import thunk from 'redux-thunk'
import { combineReducers, applyMiddleware, legacy_createStore as createStore, } from 'redux'
import user_reducer from './reducers/user.reducer'
import enchere_reducer from './reducers/enchere.reducer'
import setting_reducer from './reducers/setting.reducer'
import notification_reducer from './reducers/notification.reducer'

const reducers = combineReducers({
    user: user_reducer,
    enchere: enchere_reducer,
    setting: setting_reducer,
    notification: notification_reducer
})

const Store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default Store