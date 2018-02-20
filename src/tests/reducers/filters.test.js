import moment from "moment";
import filtersReducer from "../../reducers/filters";
import {
	setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate
}from "../../actions/filters";

test('should return the default state when no input supplied', () => {
	const defaultState = {
		text: "",
		sortBy: "createdAt",
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	};
	const action = {
		type: "@@INIT"
	};
	const filter = filtersReducer(undefined, action);
	expect(filter).toEqual(defaultState);
});

test('should set sort by to amount', () => {
	const expectedState = {
		text: "",
		sortBy: "amount",
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	};
	const action = sortByAmount();
	const filter = filtersReducer(undefined, action);
	expect(filter).toEqual(expectedState);
});

test('should set sort by to createdAt', () => {
	const expectedState = {
		text: "",
		sortBy: "createdAt",
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	};
	const action = sortByDate();
	const filter = filtersReducer({ ...expectedState, sortBy: "amount" }, action);
	expect(filter).toEqual(expectedState);
});

test('should set text filter value', () => {
	const text = "hello";
	const expectedState = {
		text,
		sortBy: "createdAt",
		startDate: moment().startOf('month'),
		endDate: moment().endOf('month')
	};
	const action = setTextFilter(text);
	const filter = filtersReducer(undefined, action);
	expect(filter).toEqual(expectedState);
});

test('should set start date', () => {
	const startDate = 1000;
	const expectedState = {
		text: "",
		sortBy: "createdAt",
		startDate,
		endDate: moment().endOf('month')
	};
	const action = setStartDate(startDate);
	const filter = filtersReducer(undefined, action);
	expect(filter).toEqual(expectedState);
});

test('should set end date', () => {
	const endDate = moment().startOf('month').add(5, "days");
	const expectedState = {
		text: "",
		sortBy: "createdAt",
		startDate: moment().startOf('month'),
		endDate
	};
	const action = setEndDate(endDate);
	const filter = filtersReducer(undefined, action);
	expect(filter).toEqual(expectedState);
});