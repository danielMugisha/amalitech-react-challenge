import { createStore, compose } from "redux";
import rootReducer from "./reducers/rootReducer";

const store = createStore(
	rootReducer,
	{},
	compose(window.devToolsExtension ? window.devToolsExtension() : (f) => f)
);

export default store;
