import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";
import getExpensesTotal from "../../selectors/expenses-total";

test('should render ExpensesSummary with two expenses totaling $250', () => {
	const total = getExpensesTotal([expenses[0], expenses[1]]);
	const count = 2;
	const wrapper = shallow(<ExpensesSummary total={ total } count={ count } />);
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with three expenses totaling $330', () => {
	const total = getExpensesTotal(expenses);
	const count = 3;
	const wrapper = shallow(<ExpensesSummary total={ total } count={ count } />);
	expect(wrapper).toMatchSnapshot();
});