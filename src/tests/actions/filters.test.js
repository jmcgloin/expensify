import moment from "moment";
import { setTextFilter,
	sortByDate,
	sortByAmount,
	setStartDate,
	setEndDate
} from "../../actions/filters";


test('should create text filter object with default value', () => {
	const action = setTextFilter();
	expect(action).toEqual({
		type: "SET_TEXT_FILTER",
		text: ""
	});
});

test('should create text filter object with supplied value', () => {
	const text = "bills";
	const action = setTextFilter(text);
	expect(action).toEqual({
		type: "SET_TEXT_FILTER",
		text
	});
});

test('should create sortByDate object', () => {
	const action = sortByDate();
	expect(action).toEqual({
		type: "SORT_BY_DATE"
	});
});

test('should create sortByAmount object', () => {
	const action = sortByAmount();
	expect(action).toEqual({
		type: "SORT_BY_AMOUNT"
	});
});

test('should create setStartDate object', () => {
	const action = setStartDate(moment(0));
	expect(action).toEqual({
		type: "SET_START_DATE",
		startDate: moment(0)
	});
});

test('should create setEndDate object', () => {
	const action = setEndDate(moment(0));
	expect(action).toEqual({
		type: "SET_END_DATE",
		endDate: moment(0)
	});
});