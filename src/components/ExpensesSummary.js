import React from "react";
import numeral from "numeral";
import { connect } from "react-redux";
import getExpensesTotal from "../selectors/expenses-total";
import selectExpenses from "../selectors/expenses";

export const ExpensesSummary = ({ total, count }) => 
{
	const plural = count === 1 ? "" : "s";
	total = numeral(total / 100).format("$0,0.00");
	return (
		<div>You are currently viewing {count} expense{plural}, totaling {total}</div>
	);
};

const mapStateToProps = (state) => {
	const expenses = selectExpenses(state.expenses, state.filters);
	return {
		total: getExpensesTotal(expenses),
		count: expenses.length
	}
};

export default connect(mapStateToProps)(ExpensesSummary);