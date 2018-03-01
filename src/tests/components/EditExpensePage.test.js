import React from "react";
import { shallow } from "enzyme";
import expenses from "../fixtures/expenses";
import { EditExpensePage } from "../../components/EditExpensePage";

let startEditExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
	startEditExpense = jest.fn();
	startRemoveExpense = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditExpensePage
		startEditExpense={ startEditExpense }
		startRemoveExpense={ startRemoveExpense }
		history={ history }
		expense={ expenses[0] }
	/>);
})

test('should correctly render edit expense page', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should handle edit expense', () => {
	wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
	expect(startEditExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
	expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle remove expense', () => {
	wrapper.find('button').simulate('click', { expense: expenses[0]});
	expect(startRemoveExpense).toHaveBeenLastCalledWith(expenses[0].id);
	expect(history.push).toHaveBeenLastCalledWith('/');
});