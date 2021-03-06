import React from "react";
import { Router as Router, Route, Link, Switch, NavLink } from "react-router-dom";
import createHistory from "history/createBrowserHistory";
import AddExpensePage from "../components/AddExpensePage";
import EditExpensePage from "../components/EditExpensePage";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import LoginPage from "../components/LoginPage";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import HelpPage from "../components/HelpPage";
import NotFoundPage from "../components/NotFoundPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

export const history = createHistory();

const AppRouter = () => (
	<Router history={ history }>
		<div>
			<Switch>
				<PublicRoute exact={ true } path="/" component={ LoginPage } />
				<PrivateRoute path="/dashboard" component={ ExpenseDashboardPage } />
				<PrivateRoute path="/create" component={ AddExpensePage } />
				<PrivateRoute path="/edit/:id" component={ EditExpensePage } />
				<Route component={ NotFoundPage } />
			</Switch>
		</div>
	</Router>
);

export default AppRouter;