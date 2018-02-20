import React from "react";
import { Link } from "react-router-dom";

const ExpenseListItem =  ({ description, id, amount, createdAt, note }) => {
	return (
		<div>
			<h3>{ description }</h3>
			<p>
				Amount: { amount }   |
				Date Created: { createdAt }				
				<Link to={`/edit/${id}`} >
					Edit
				</Link>
			</p>
		</div>
	);
}

export default ExpenseListItem;