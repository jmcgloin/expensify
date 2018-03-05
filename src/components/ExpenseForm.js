import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { SingleDatePicker } from "react-dates";
import { history } from "../routers/AppRouter";

export default class ExpenseForm extends React.Component {
	constructor(props) {
		super(props);
		const edit = !!props.expense;
		this.state = {
			description: edit ? props.expense.description : "",
			amount: edit ? (props.expense.amount/100).toString() : "",
			note: edit ? props.expense.note : "",
			createdAt: edit ? moment(props.expense.createdAt) : moment(),
			calendarFocused: false,
			errorMessage: null
		};
	};
	onDescriptionChange = (e) => {
		const errorMessage = this.state.errorMessage && null;
		this.setState({
			description: e.target.value,
			errorMessage
		});
	};
	onAmountChange = (e) => {
		const amount = e.target.value;
		const errorMessage = this.state.errorMessage && null;
		if(!amount || amount.match(/^\d+(\.\d{0,2})?$/g)) {
			this.setState(() => ({ amount, errorMessage }));
		} else {
			e.target.value = this.state.amount;
		}
	};
	onNoteChange = (e) => {
		this.setState({
			note: e.target.value
		});
	};
	onNewExpenseSubmit = (e) => {
		e.preventDefault();
		if(!this.state.amount || !this.state.description) {
			const errorMessage = "You must enter a description and amount";
			this.setState(() => ({ errorMessage }))
		} else {
			this.state.errorMessage && this.setState(() => ({ errorMessage: null }));
			this.props.onSubmit({
				description: this.state.description,
				amount: parseFloat(this.state.amount, 10) * 100,
				createdAt: this.state.createdAt.valueOf(),
				note: this.state.note
			});
		}
	};
	onDateChange = (createdAt) => {
		createdAt && this.setState(() => ({ createdAt }));
	};
	onFocusChange = ({ focused }) => {
		this.setState(() => ({ calendarFocused: focused }))
	};
	onCancel = () => {
		history.push("/dashboard");
	}
	render() {
		return (
			<div>
				<h1>Expense Form</h1>
				{this.state.errorMessage}
				<form onSubmit={this.onNewExpenseSubmit}>
					<input 
						type="text"
						name="newDescription"
						placeholder="Enter a new expense"
						autoFocus
						value={this.state.description}
						onChange={this.onDescriptionChange}
					/>
					<input
						type="text"
						name="newAmount"
						placeholder="Amount"
						value={this.state.amount}
						onChange={this.onAmountChange}
					/>
					<SingleDatePicker
						date={this.state.createdAt}
						onDateChange={this.onDateChange}
						focused={this.state.calendarFocused}
						onFocusChange={this.onFocusChange}
						numberOfMonths={1}
						isOutsideRange={() => false}
					/>
					<textarea
						name="newNote"
						placeholder="Optional notes" 
						onInput={this.onNoteChange}
					/>
					<button>Submit</button>
					<button onClick={ this.onCancel }>Cancel</button>
				</form>
			</div>
		);
	};
};