import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../actions/auth";

//project-660304084367

export const LoginPage = ({ startLogin }) => (
	<div>
		<button onClick={ startLogin }>Log In</button>
	</div>
);

const mapDispatchToProps = (dispatch) => ({
	startLogin: () => dispatch(startLogin())
});

export default connect(undefined, mapDispatchToProps)(LoginPage);