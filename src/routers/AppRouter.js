import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, NavLink } from "react-router-dom";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";

const AppRouter = () => (
	<Router>
		<div>
			<Header />
			<Navbar />
			<Switch>
				<Route exact={ true } path="/" component={ ExpenseDashboardPage } />
				<Route path="/create" component={ AddExpensePage } />
				<Route path="/edit/:id" component={ EditExpensePage } />
				<Route path="/help" component={ HelpPage } />
				<Route component={ NotFoundPage } />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;