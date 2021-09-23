import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import PlacesNavigator from "./src/navigation/PlacesNavigator";
import placesReducer from "./src/store/places-reducers";
import { init } from "./src/helper/db";

init()
	.then(() => {
		console.log("Initialized database");
	})
	.catch(err => {
		console.log("Initializing db failed.");
		console.log(err);
	});

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
	places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	return (
		<Provider store={store}>
			<PlacesNavigator />
		</Provider>
	);
}
