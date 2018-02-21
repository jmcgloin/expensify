import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem =  ({ description, id, amount, createdAt, note }) => {
	const money = numeral(amount / 100).format('$0,0.00');
	return (
		<div>
			<h3>{ description }</h3>
			<p>
				Amount: { money }   |
				Date Created: { moment(createdAt).format("ddd, MMM Do, YYYY") }
				<Link to={ `/edit/${ id }` } >
					Edit
				</Link>
			</p>
		</div>
	);
}

export default ExpenseListItem;