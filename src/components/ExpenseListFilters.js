import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from "../actions/filters";


export class ExpenseListFilters extends React.Component {
	state = {
		calendarFocused: null
	};
	onDatesChange = ({ startDate, endDate }) => {
		this.props.setStartDate(startDate);
		this.props.setEndDate(endDate);
	};
	onFocusChange= (calendarFocused) => {
		this.setState(() => ({ calendarFocused }));
	};
	onSortChange = (e) => {
		console.log("value", e.target.value);
		e.target.value === "createdAt" ?
			this.props.sortByDate() :
			this.props.sortByAmount();
	};
	onTextChange = (e) => {
		this.props.setTextFilter(e.target.value);
	};
	render() {
		return (
			<div>
			<input type="text" value={ this.props.filters.text } onChange={ this.onTextChange } />
			<select value={this.props.filters.sortBy} onChange={ this.onSortChange } >
				<option value="createdAt">Date</option>
				<option value="amount">Amount</option>
			</select>
			<DateRangePicker 
				startDate={this.props.filters.startDate}
				startDateId='start'
				endDate={this.props.filters.endDate}
				endDateId='end'
				onDatesChange={this.onDatesChange}
				focusedInput={this.state.calendarFocused}
				onFocusChange={this.onFocusChange}
				numberOfMonths={1}
				isOutsideRange={() => false}
				showClearDates={true}
			/>
		</div>
		)
	}
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		setStartDate: (startDate) => dispatch(setStartDate(startDate)),
		setEndDate: (endDate) => dispatch(setEndDate(endDate)),
		setTextFilter: (text) => dispatch(setTextFilter(text)),
		sortByAmount: () => dispatch(sortByAmount()),
		sortByDate: () => dispatch(sortByDate())
	};
};

const mapStateToProps = (state) => {
	return {
		filters: state.filters
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);