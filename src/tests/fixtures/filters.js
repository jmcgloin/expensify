import moment from "moment";

const defFilters = {
	text: "",
	sortBy: "createdAt",
	startDate: undefined,
	endDate: undefined
};

const popFilters = {
	text: "bill",
	sortBy: "amount",
	startDate: moment(0),
	endDate: moment(0).add(3, "days")
};

export { defFilters, popFilters };