import moment from "moment";
import getVisibleExpenses from "../../selectors/expenses";
import expenses from "../fixtures/expenses";

test('return expenses filtered by text and sorted by amount with no dates', () => {
	const text = "Bill";
	const filteredExpenses = getVisibleExpenses(expenses, {text, sortBy: "amount",
		startDate:undefined, endDate: undefined});

	expect(filteredExpenses).toEqual([expenses[1], expenses[0]])
});

test('return expenses filtered by text and sorted by date', () => {
	const text = "a";
	const filteredExpenses = getVisibleExpenses(expenses, {text, sortBy: "createdAt",
		startDate:undefined, endDate: undefined});

	expect(filteredExpenses).toEqual([expenses[0], expenses[2]])
});

test('return expenses filtered by start and end date and sorted by amount', () => {
	const startDate = moment('218-02-07');
	const endDate = moment('2018-02-13');
	const filteredExpenses = getVisibleExpenses(expenses, {text: "", sortBy: "amount",
		startDate, endDate});

	expect(filteredExpenses).toEqual([expenses[0], expenses[2]]);
});

test('return expenses with no filtering but sorted by date', () => {
	const startDate = undefined;
	const endDate = undefined;
	const filteredExpenses = getVisibleExpenses(expenses, {text: "", sortBy: "createdAt",
		startDate, endDate});

	expect(filteredExpenses).toEqual([expenses[1], expenses[0], expenses[2]]);
});