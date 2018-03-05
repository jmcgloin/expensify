import authReducer from "../../reducers/auth";

test('should return uid on login', () => {
	const uid = "123";
	const action = { type: "LOGIN", uid };
	const returnedState = authReducer(uid, action);
	expect(returnedState).toEqual({ uid });
});

test('should return an empty object on logout', () => {
	const action = { type: "LOGOUT" };
	const returnedState = authReducer({} ,action);
	expect(returnedState).toEqual({});
});