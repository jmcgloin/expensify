import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => (
	<nav>
		<NavLink to="/" activeClassName="is-active" exact={ true }>Home</NavLink>
		<NavLink to="/create" activeClassName="is-active">Add</NavLink>
	</nav>
);

export default Navbar;