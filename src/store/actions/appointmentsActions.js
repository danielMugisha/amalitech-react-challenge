import { ActionTypes } from "./actionTypes";

export const setAppointments = (appointments) => {
	return {
		type: ActionTypes.SET_APPOINTMENTS,
		payload: appointments,
	};
};
