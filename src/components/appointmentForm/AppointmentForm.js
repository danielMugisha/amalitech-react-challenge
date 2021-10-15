import React from "react";
import { ContactPicker } from "../contactPicker/ContactPicker";
import { TextField } from "@material-ui/core";
import DateMomentUtils from "@date-io/moment";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import {
	KeyboardTimePicker,
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";

const materialTheme = createTheme({
	overrides: {
		MuiPickersToolbar: {
			toolbar: {
				backgroundColor: "#1e776e",
			},
		},
		MuiPickersCalendarHeader: {
			switchHeader: {
				// backgroundColor: lightBlue.A200,
				// color: "white",
			},
		},
		MuiPickersDay: {
			day: {
				color: "#1e776e",
			},
			daySelected: {
				backgroundColor: "#1e776e",
			},
			dayDisabled: {
				color: "#1e776e",
			},
			current: {
				color: "#1e776e",
			},
		},
		MuiPickersModal: {
			dialogAction: {
				color: "#1e776e",
			},
		},
	},
});

export const AppointmentForm = ({
	contacts,
	title,
	setTitle,
	contact,
	setContact,
	date,
	setDate,
	time,
	setTime,
	handleSubmit,
}) => {
	const getTodayString = () => {
		const [month, day, year] = new Date()
			.toLocaleDateString("en-US")
			.split("/");
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
	};

	const minDate = getTodayString();
	console.log(minDate);

	const setSelectedContact = (selectedContact) => {
		setContact(selectedContact);
	};

	return (
		<div className="formBody">
			<TextField
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				label="Title"
				color="primary"
				name="title"
				type="text"
				style={{ margin: "10px", width: "98%" }}
				variant="outlined"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<MuiPickersUtilsProvider utils={DateMomentUtils}>
				<ThemeProvider theme={materialTheme}>
					<KeyboardDatePicker
						minDate={minDate}
						autoOk
						variant="inline"
						inputVariant="outlined"
						label="Date"
						format="MMM D, YYYY"
						value={date}
						style={{ margin: "10px", width: "98%" }}
						InputAdornmentProps={{ position: "end" }}
						onChange={(date) => setDate(date)}
					/>
					<KeyboardTimePicker
						style={{ margin: "10px", width: "98%" }}
						label="Time"
						placeholder="08:00 AM"
						mask="__:__ _M"
						value={time}
						onChange={(time) => setTime(time)}
						keyboardIcon={<AccessTimeOutlinedIcon />}
						variant="inline"
						inputVariant="outlined"
					/>
				</ThemeProvider>
			</MuiPickersUtilsProvider>
			<ContactPicker
				contacts={contacts}
				onChange={setSelectedContact}
				selectedContact={contact}
			/>
			<button className="submitButton " onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
};
