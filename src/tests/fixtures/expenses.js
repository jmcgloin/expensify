import moment from "moment";

export  default [
	{
		description: "A bill",
		amount: 10000,
		note: "A note",
		createdAt: moment('2018-02-12').valueOf(),
		id: "1"
	},
	{
		description: "B bill",
		amount: 15000,
		note: "B note",
		createdAt: moment('2018-02-20').valueOf(),
		id: "2"
	},
	{
		description: "Gas",
		amount: 8000,
		note: "Corn!  It gives ya gas.",
		createdAt: moment('2018-02-08').valueOf(),
		id: "3"
	}
];