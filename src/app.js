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
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import getVisibleExpenses from "./selectors/expenses";
import { addExpense, removeExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import "./firebase/firebase";

// ===STORE=== //
const store = configureStore();

// ===JSX=== //
const jsx = (
	<Provider store={store} >
		<AppRouter />
	</Provider>
);

// ===REACT DOM=== //
ReactDOM.render(jsx, document.getElementById("app"));