import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import {
	startAddExpense, addExpense, editExpense,
	removeExpense, setExpenses, startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({ id, description, amount, note, createdAt }) => {
		expensesData[id] = { description, amount, note, createdAt };
	});
	database.ref('expenses').set(expensesData).then(() => done());
});

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

test('should add expense to database and store ', (done) => {
	const expenseData = {
		description: "B bill",
		amount: 15000,
		note: "B note",
		createdAt: 1000
	}
	const store = createMockStore({});
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "ADD_EXPENSE",
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});
		return database.ref(`expenses/${actions[0].expense.id}`).once("value");
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});;
});

test('should add expense with defaults to database and store ', (done) => {
	const expenseData = {
		description: "",
		amount: 0,
		note: "",
		createdAt: 0
	}
	const store = createMockStore({});
	store.dispatch(startAddExpense()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "ADD_EXPENSE",
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});
		return database.ref(`expenses/${actions[0].expense.id}`).once("value");
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});;
});

test('should set up an add expense action object with supplied data', () => {
	const action = addExpense(expenses[0]);
	expect(action).toEqual(
	{
		type: "ADD_EXPENSE",
		expense: (expenses[0])
	}
	);
});


test('should set up a set expenses action', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: "SET_EXPENSES",
		expenses
	});
});

test('should get data from firebase', (done) => {
	const store = createMockStore({});
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "SET_EXPENSES",
			expenses
		});
	});
	done();
});