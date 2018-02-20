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

// ===STORE=== //
const store = configureStore();

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
})

// ===ACTIONS=== //
const expenseOne = store.dispatch(addExpense({description: "Water Bill", amount: 5000, createdAt: 2750}));
const expenseTwo = store.dispatch(addExpense({description: "Electric Bill", amount: 8000, createdAt: 3500}));
const expenseThree = store.dispatch(addExpense({description: "Gas Bill", amount: 6000, createdAt: 1500}));

// ===JSX=== //
const jsx = (
	<Provider store={store} >
		<AppRouter />
	</Provider>
);

// ===REACT DOM=== //
ReactDOM.render(jsx, document.getElementById("app"));