export default (expenses = [{ amount: 0 }]) => {
	return expenses.reduce((a, c) => a + c.amount, 0);
};