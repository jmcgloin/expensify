import React from "react";
import { connect } from "react-redux";
import { startLogout } from "../actions/auth";
import Navbar from "./Navbar";

export const Header = ({ startLogout }) => (
		<header>
			<h1>Expensify</h1>
			<button onClick={ startLogout }>Log Out</button>
		</header>
);

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);