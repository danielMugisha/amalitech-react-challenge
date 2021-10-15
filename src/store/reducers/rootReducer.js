import { appointmentsReducer } from "./appointmentsReducer";
import { contactReducer } from "./contactsReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
	contacts: contactReducer,
	appointments: appointmentsReducer,
});

export default rootReducer;
