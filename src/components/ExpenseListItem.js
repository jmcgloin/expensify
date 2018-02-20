import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const ExpenseListItem =  ({ description, id, amount, createdAt, note }) => {
	return (
		<div>
			<h3>{ description }</h3>
			<p>
				Amount: { amount }   |
				Date Created: { moment(createdAt).format("ddd, MMM Do, YYYY [at] h:mm A ") }
				<Link to={`/edit/${id}`} >
					Edit
				</Link>
			</p>
		</div>
	);
}

export default ExpenseListItem;