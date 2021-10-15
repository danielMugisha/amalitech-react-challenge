import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	appointments: [],
};

export const appointmentsReducer = (
	state = initialState,
	{ type, payload }
) => {
	switch (type) {
		case ActionTypes.SET_APPOINTMENTS:
			return {
				...state,
				appointments: payload,
			};
		default:
			return state;
	}
};
