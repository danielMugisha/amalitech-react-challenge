import { ActionTypes } from "../actions/actionTypes";

const initialState = {
	contacts: [],
};

export const contactReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case ActionTypes.SET_CONTACTS:
			// console.log("payload:", payload);
			return {
				...state,
				contacts: payload,
			};
		default:
			return state;
	}
};
