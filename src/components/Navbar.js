import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => (
	<nav>
		<NavLink to="/" activeClassName="is-active" exact={ true }>Login</NavLink>
		<NavLink to="/create" activeClassName="is-active">Add</NavLink>
		<NavLink to="/dashboard" activeClassName="is-active">Dashboard</NavLink>
	</nav>
);

export default Navbar;