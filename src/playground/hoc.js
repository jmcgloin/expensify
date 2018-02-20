import React from "react";
import ReactDOM from "react-dom";

const Info = (props) => (
	<div>
		<h1>This is the info:</h1>
		<p>{props.info}</p>
	</div>
);

const withAdminWarning = (WrappedComponent) => {
	return (props) => (
		<div>
			{props.isAdmin && <p>This info is private. Don't share.</p>}
			<WrappedComponent {...props}/>
		</div>
	)
};

const requireAuthentication = (WrappedComponent) => {
	return (props) => (
		<div>
			{props.isAuthenticated ? <WrappedComponent {...props}/> : <p>Please log in to view the info.</p>}
		</div>
	)
}

const AdminInfo  = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);

// ReactDOM.render(<AdminInfo isAdmin={false} info="Some private stuff" />, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="Some private stuff" />, document.getElementById('app'));