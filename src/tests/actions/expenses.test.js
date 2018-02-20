import { addExpense, editExpense, removeExpense } from "../../actions/expenses";

test('should set up remove expense action object', () => {
	const action = removeExpense(123);
	expect(action).toEqual(
		{
			type: 'REMOVE_EXPENSE',
			id: 123
		}
	);
});

test('should set up an edit expense action object', () => {
	const action = editExpense(123, { description: "edited" });
	expect(action).toEqual(
		{
			type: "EDIT_EXPENSE",
			id: 123,
			updates: {
				description: "edited"
			}
		}
	);
});

test('should set up an add expense action object without supplied data', () => {
	const action = addExpense();
	expect(action).toEqual(
	{
		type: "ADD_EXPENSE",
		expense: {
			description: "",
			note: "",
			amount: 0,
			createdAt: 0,
			id: expect.any(String)
		}
	}
	);
});

test('should set up an add expense action object with supplied data', () => {
	const data = {
		description: "desc",
		note: "note",
		amount: 10,
		createdAt: 20,
	}
	const action = addExpense(data);
	expect(action).toEqual(
	{
		type: "ADD_EXPENSE",
		expense: {
			...data,
			id: expect.any(String)
		}
	}
	);
});
