import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";
import { EditExpensePage } from "../../components/EditExpensePage";

let editExpense, removeExpense, history, wrapper;

beforeEach(() => {
	editExpense = jest.fn();
	removeExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditExpensePage
		editExpense={ editExpense }
		removeExpense={ removeExpense }
		history={ history }
		expense={ expenses[0] }
	/>);
})

test('should correctly render edit expense page', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle edit expense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
	expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
	expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle remove expense', () => {
	wrapper.find('button').simulate('click', { expense: expenses[0]});
	expect(removeExpense).toHaveBeenLastCalledWith(expenses[0].id);
	expect(history.push).toHaveBeenLastCalledWith('/');
});