import { ActionTypes } from "./actionTypes";

export const setContacts = (contacts) => {
	return {
		type: ActionTypes.SET_CONTACTS,
		payload: contacts,
	};
};
