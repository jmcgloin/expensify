import moment from "moment";
import expensesReducer from "../../reducers/expenses";
import { addExpense, removeExpense, editExpense, setExpenses } from "../../actions/expenses";
import expenses from "../fixtures/expenses";

test('should set a default array', () => {
	const state = expensesReducer(undefined, { type: "@@INIT" });
	expect(state).toEqual([]);
});

test('should add a new expense', () => {
	const returnedState = expensesReducer([], addExpense(expenses[0]));
	expect(returnedState).toEqual([{ ...expenses[0], id: expect.any(String)}]);
});

test('should remove an existing expense', () => {
	const returnedState = expensesReducer(expenses, removeExpense(expenses[1].id));
	expect(returnedState).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expenses if id is not found', () => {
	const returnedState = expensesReducer(expenses, removeExpense(5));
	expect(returnedState).toEqual(expenses);
})

test('should edit an existing expense', () => {
	const updates = {
		description: "Rent",
		amount: 120000
	};
	const returnedState = expensesReducer(expenses, editExpense(expenses[1].id, updates));
	expect(returnedState).toEqual([expenses[0], { ...expenses[1], ...updates }, expenses[2]]);
});

test('should not edit any expenses if no id is supplied', () => {
	const updates = {
		description: "Rent",
		amount: 120000
	};
	const returnedState = expensesReducer(expenses, editExpense(5, updates));
	expect(returnedState).toEqual(expenses);
});

test('should set expenses', () => {
	const state = [
		{
			description: "Old bill",
			amount: 25000,
			note: "Old note",
			createdAt: moment('2017-02-12').valueOf(),
			id: "old1"
		}
	];
	const returnedState = expensesReducer(state, setExpenses(expenses));
	expect(returnedState).toEqual(expenses);
});