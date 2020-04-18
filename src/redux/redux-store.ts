import {combineReducers, createStore} from "redux";
import analyticsReducer from "./analytics-reducer";
import accountReducer from "./account-reducer";
import historyReducer from "./history-reducer";
import settingsReducer from "./settings-reducer";

const reducers = combineReducers({
    account: accountReducer,
    analytics: analyticsReducer,
    history: historyReducer,
    settings: settingsReducer,
});

const store = createStore(reducers);
// @ts-ignore
window.store = store;

export default store;
