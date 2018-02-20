import { createStore, combineReducers } from "redux";
import uuid from "uuid";

const demoState = {
	expenses: [{
		id: "qwerty",
		description: "January Rent",
		note: "Last payment at that address",
		amount: 850000,
		createdAt: 0
	}],
	filters: {
		text: "rent",
		sortBy: "amount", //date or amount
		startDate: undefined,
		endDate: undefined
	}
};

// ===ADD_EXPENSE=== //
const addExpense = (
{
	description= "",
	note= "",
	amount= 0,
	createdAt= 0 
} = {}) => ({
	type: "ADD_EXPENSE",
	expense: {
		id: uuid(),
		description: description,
		note: note,
		amount: amount,
		createdAt: createdAt
	}
});

// ===REMOVE_EXPENSE=== //
const removeExpense = ({ id } = {}) => ({
	type: "REMOVE_EXPENSE",
	id
});

// ===EDIT_EXPENSE=== //
const editExpense = (id, updates) => ({
	type: "EDIT_EXPENSE",
	id,
	updates
});

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
	switch(action.type) {
		case "ADD_EXPENSE":
			return [...state, action.expense];
		case "REMOVE_EXPENSE":
			return state.filter(({ id }) => id !== action.id);
		case "EDIT_EXPENSE":
			return state.map((expense) => expense.id === action.id ?
				{ ...expense, ...action.updates } : expense)
		default:
			return state;
	}
};

//SET_TEXT_FILTER
const setTextFilter = (text= "") => ({
	type: "SET_TEXT_FILTER",
	text
});

//SORT_BY_DATE
const sortByDate = () => ({
	type: "SORT_BY_DATE"
});

//SORT_BY_AMOUNT
const sortByAmount = () => ({
	type: "SORT_BY_AMOUNT"
});

//SET_START_DATE
const setStartDate = (startDate = undefined) => ({
	type: "SET_START_DATE",
	startDate
});

//SET_END_DATE
const setEndDate = (endDate = undefined) => ({
	type: "SET_END_DATE",
	endDate
});

const filtersReducerDefaultState = {
	text: "",
	sortBy: "createdAt",
	startDate: undefined,
	endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
	switch(action.type) {
		case "SET_TEXT_FILTER":
			return { ...state, text: action.text}
		case "SORT_BY_DATE":
			return { ...state, sortBy: "createdAt"};
		case "SORT_BY_AMOUNT":
			return { ...state, sortBy: "amount"};
		case "SET_START_DATE":
			return { ...state, startDate: action.startDate };
		case "SET_END_DATE":
			return { ...state, endDate: action.endDate };
		default:
			return state;
	}
}

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
	return expenses.filter((expense) => {
		const startDateMatch = typeof startDate !== "number" || expense.createdAt >= startDate;
		const endDateMatch = typeof endDate !== "number" || expense.createdAt <= endDate;
		const textMatch = textMatch === "" || !!expense.description.toLowerCase().includes(text.toLowerCase());
		return startDateMatch && endDateMatch && textMatch
	}).sort((a,b) => b[sortBy] - a[sortBy]);
};

const store = createStore(
	combineReducers({
		expenses: expensesReducer,
		filters: filtersReducer
	})
);

store.subscribe(() => {
	const state = store.getState();
	const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
	console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense({ description: "rent", amount: 100, createdAt: 700 }));

const expenseTwo = store.dispatch(addExpense({ description: "coffee", amount: 300, createdAt: 1100 }));

// store.dispatch(sortByAmount());

store.dispatch(editExpense(expenseOne.expense.id, { createdAt: 1100 }));

// store.dispatch(removeExpense(expenseTwo.expense));

// store.dispatch(setTextFilter("Re"));

// store.dispatch(setTextFilter());

// store.dispatch(sortByAmount());

// store.dispatch(sortByDate());

// store.dispatch(setStartDate(10));
// store.dispatch(setEndDate(200));
// store.dispatch(setStartDate(10));
// store.dispatch(setEndDate(1200));

// ===OBJECT SPREAD PRACTICE=== //
// const user = {
// 	name: "Tala",
// 	age: 40
// };

// console.log({ ...user, location: "Akron" });