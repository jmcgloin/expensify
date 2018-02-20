import React from "react";
import moment from "moment";
import { shallow } from "enzyme";
import ExpenseForm from "../../components/ExpenseForm";
import expenses from "../fixtures/expenses";

test('should render expense form correctly', () => {
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper).toMatchSnapshot();
});

test('should render expense form with data provided', () => {
	const wrapper = shallow(<ExpenseForm expense={ expenses[0] }/>);
	expect(wrapper).toMatchSnapshot();
});

test('should submit the form on submit', () => {
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	});
	expect(wrapper.state('errorMessage')).toEqual(expect.any(String));
	expect(wrapper).toMatchSnapshot();
});

test('should set decription on description on change', () => {
	const value = "Description";
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('description')).toBe(value);
});

test('should set note on input chagne', () => {
	const value = "My you're looking damn fly today";
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper.state('note')).toBe("");
	wrapper.find('textarea').simulate('input', {
		target: { value }
	});
	expect(wrapper.state('note')).toBe(value);
});

test('should set amount with valid data', () => {
	const value = "123.12";
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper.state('amount')).toBe("");
	wrapper.find('[name="newAmount"]').simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount with invalid data', () => {
	const value = "21.321";
	const wrapper = shallow(<ExpenseForm />);
	expect(wrapper.state('amount')).toBe("");
	wrapper.find('[name="newAmount"]').simulate('change', {
		target: { value }
	});
	expect(wrapper.state('amount')).toBe("");
});

test('should call on submit prop for valid form submission', () => {
	const { description, amount, note, createdAt } = expenses[0];
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />);
	wrapper.find('form').simulate('submit', {
		preventDefault: () => {}
	});
	expect(wrapper.state('errorMessage')).toBe(null);
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		description,
		amount,
		createdAt: createdAt.valueOf(),
		note
	});
});

test('should set the date when date change', () => {
	const now = moment();
	const wrapper = shallow(<ExpenseForm />);
	wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
	expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calendar focus on focus change', () => {
	const wrapper = shallow(<ExpenseForm />);
	const focused = !wrapper.find('withStyles(SingleDatePicker)').prop('focused');
	wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
	expect(wrapper.state('calendarFocused')).toBe(focused);
});