import getExpensesTotal from "../../selectors/expenses-total";
import expenses from "../fixtures/expenses";

test('should return 0 for no expenses', () => {
	const total = getExpensesTotal();
	expect(total).toBe(0);
});

test('should return the amount as total for one expense', () => {
	const total = getExpensesTotal([expenses[0]]);
	expect(total).toBe(expenses[0].amount);
});

test('should return the total of the amounts of the expenses', () => {
	const total = getExpensesTotal(expenses);
	const sum = expenses[0].amount + expenses[1].amount + expenses[2].amount
	expect(total).toBe(sum);
})