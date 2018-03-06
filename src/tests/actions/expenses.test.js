import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import {
	startAddExpense, addExpense, startEditExpense, editExpense,
	startRemoveExpense, removeExpense, setExpenses, startSetExpenses
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";

const uid = "123test";
const defaultState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
	const expensesData = {};
	expenses.forEach(({ id, description, amount, note, createdAt }) => {
		expensesData[id] = { description, amount, note, createdAt };
	});
	database.ref(`users/${ uid }/expenses`).set(expensesData).then(() => done());
});

// ===REMOVE EXPENSE ACTION===//
test('should set up remove expense action object', () => {
	const action = removeExpense(123);
	expect(action).toEqual(
		{
			type: 'REMOVE_EXPENSE',
			id: 123
		}
	);
});

// ===REMOVE FROM FIREBASE=== //
test('should remove an expense from firebase', (done) => {
	const store = createMockStore(defaultState);
	const id = expenses[0].id;
	store.dispatch(startRemoveExpense(id)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "REMOVE_EXPENSE",
			id
		});
		return database.ref(`users/${ uid }expenses/${ id }`).once("value");
	}).then((snapshot) => {
		expect(snapshot.val()).toBe(null);
		done();
	});
});

// ===SET EDIT ACTION===///
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

// ===EDIT EXPENSE ON FIREBASE=== //
test('should edit an expense on firebase', (done) => {
	const updates = {
		amount: 5000
	};
	const id = expenses[2].id;
	const store = createMockStore(defaultState);
	store.dispatch(startEditExpense(id, updates)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "EDIT_EXPENSE",
			id,
			updates
		});
		return database.ref(`users/${ uid }/expenses/${ id }`).once("value");
	}).then((snapshot) => {
		expect({ id, ...snapshot.val() }).toEqual({
			...expenses[2],
			...updates
		});
		done();
	});
});

// ===ADD EXPENSE TO FIREBASE=== //
test('should add expense to database and store ', (done) => {
	const expenseData = {
		description: "B bill",
		amount: 15000,
		note: "B note",
		createdAt: 1000
	}
	const store = createMockStore(defaultState);
	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "ADD_EXPENSE",
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});
		return database.ref(`users/${ uid }/expenses/${actions[0].expense.id}`).once("value");
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});;
});

// ===ADD EXPENSE TO FIREBASE=== //
test('should add expense with defaults to database and store ', (done) => {
	const expenseData = {
		description: "",
		amount: 0,
		note: "",
		createdAt: 0
	}
	const store = createMockStore(defaultState);
	store.dispatch(startAddExpense()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "ADD_EXPENSE",
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});
		return database.ref(`users/${ uid }/expenses/${actions[0].expense.id}`).once("value");
	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);
		done();
	});;
});

// ===ADD EXPENSE ACTION=== //
test('should set up an add expense action object with supplied data', () => {
	const action = addExpense(expenses[0]);
	expect(action).toEqual(
	{
		type: "ADD_EXPENSE",
		expense: (expenses[0])
	}
	);
});

// ===SET EXPENSE ACTION=== //
test('should set up a set expenses action', () => {
	const action = setExpenses(expenses);
	expect(action).toEqual({
		type: "SET_EXPENSES",
		expenses
	});
});

// ===GET DATA FROM FIREBASE=== //
test('should get data from firebase', (done) => {
	const store = createMockStore(defaultState);
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions();
		expect(actions[0]).toEqual({
			type: "SET_EXPENSES",
			expenses
		});
	});
	done();
});