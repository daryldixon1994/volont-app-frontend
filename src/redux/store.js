import { createStore, combineReducers } from "redux";
import connexionReducer from "./connexionReducer";

const rootReducer = combineReducers({ connexionReducer });

const store = createStore(rootReducer);
export default store;
