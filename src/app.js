import React from "react";
import ReactDOM from "react-dom";
import * as moment from "moment";
import { Provider } from "react-redux";
import validator from "validator";
import "./styles/styles.scss";
import "normalize.css/normalize.css";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { firebase } from "./firebase/firebase";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisibleExpenses from "./selectors/expenses";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";

// ===STORE=== //
const store = configureStore();

// ===JSX=== //
const jsx = (
	<Provider store={store} >
		<AppRouter />
	</Provider>
);

// ===REACT DOM=== //
ReactDOM.render(<p>loading...</p>, document.getElementById("app"));

let hasRendered = false;

const renderApp = () => {
	if(!hasRendered) {
		ReactDOM.render(jsx, document.getElementById("app"));
		hasRendered = !hasRendered;
	}
};

firebase.auth().onAuthStateChanged((user) => {
	if(user) {
		store.dispatch(login(user.uid));
		store.dispatch(startSetExpenses()).then(() => {
			renderApp();
		});
		if(history.location.pathname === "/") history.push("/dashboard");
	} else {
		store.dispatch(logout());
		renderApp();
		history.push("/");
	}
});