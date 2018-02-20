import React from "react";
import moment from "moment";
import { shallow } from "enzyme";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { defFilters, popFilters } from "../fixtures/filters";

let wrapper, setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate;

beforeEach(() => {
	setTextFilter = jest.fn();
	sortByDate = jest.fn();
	sortByAmount = jest.fn();
	setStartDate = jest.fn();
	setEndDate = jest.fn();
	wrapper = shallow(
		<ExpenseListFilters
			filters={ defFilters }
			setTextFilter={ setTextFilter }
			sortByDate={ sortByDate }
			sortByAmount={ sortByAmount }
			setStartDate={ setStartDate }
			setEndDate={ setEndDate }
		/>);
});

test('should render ExpenseListFilters correctly with default filters', () => {
	expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters correctly with populated filters', () => {
	wrapper.setProps({
		filters: popFilters
	});
	expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
	const value = "bill";
	wrapper.find('input').simulate('change',{ target: { value } });
	expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by amount', () => {
	const value = "amount";
	wrapper.find('select').simulate('change', { target: { value } });
	expect(sortByAmount).toHaveBeenCalled();
});

test('should sort by date', () => {
	wrapper.setProps({
		filters: popFilters
	});
	const value = "createdAt";
	wrapper.find('select').simulate('change', { target: { value } });
	expect(sortByDate).toHaveBeenCalled();
});

test('should set start date', () => {
	const dates = { startDate: moment(0), endDate: moment(0).add(3, 'days') };
	wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')(dates);
	expect(setStartDate).toHaveBeenLastCalledWith(dates.startDate);
	expect(setEndDate).toHaveBeenLastCalledWith(dates.endDate);
});

test('should handle focus change', () => {
	const focus = "startDate";
	wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focus);
	expect(wrapper.state('calendarFocused')).toBe(focus);
});