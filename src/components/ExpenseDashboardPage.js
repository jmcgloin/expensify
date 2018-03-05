import React from "react";
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";
import ExpensesSummary from "./ExpensesSummary";
import { NavLink } from "react-router-dom";

const ExpenseDashboardPage = () => (
	<div>
		<NavLink to="/create" activeClassName="is-active">Add</NavLink>
		<ExpensesSummary />
		<ExpenseListFilters />
		<ExpenseList />
	</div>
);

export default ExpenseDashboardPage;