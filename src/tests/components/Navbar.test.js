import React from "react";
import { shallow } from "enzyme";
import Navbar from "../../components/Navbar";

test('should render navbar element correctly', () => {
	const wrapper = shallow(<Navbar />);
	expect(wrapper).toMatchSnapshot();
});