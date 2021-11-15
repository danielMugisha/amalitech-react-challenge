import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Event, Edit } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { ContactPicker } from "../contactPicker/ContactPicker";
import { TextField } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import DateMomentUtils from "@date-io/moment";
import {
	KeyboardTimePicker,
	KeyboardDatePicker,
	MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import moment from "moment";
import { MINDATE, dateFormat, timeFormat } from "../../utils/utils";
import { setAppointments } from "../../store/actions/appointmentsActions";

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

const EditDialog = (props) => {
	const { contacts } = useSelector((state) => state.contacts);
	const { appointments } = useSelector((state) => state.appointments);
	const dispatch = useDispatch();
	const { onClose, open, appointment } = props;
	const [title, setTitle] = useState(appointment.title);
	const [date, setDate] = useState(appointment.date);
	const [time, setTime] = useState(appointment.time);
	const [timeChanged, setTimeChanged] = useState(false);
	const [contact, setContact] = useState(appointment.contact);

	const handleClose = () => {
		onClose();
	};

	const setSelectedContact = (selectedContact) => {
		setContact(selectedContact);
	};

	const handleSave = (e) => {
		e.preventDefault();
		const _date = dateFormat(new Date(date));
		const _time = timeFormat(new Date(time));

		appointments.forEach((appo) => {
			if (appo.id === appointment.id) {
				appo.title = title;
				appo.date = _date;
				appo.time = timeChanged ? _time : time;
				appo.contact = contact;
			}
		});
		dispatch(setAppointments(appointments));
		onClose();
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Edit Appointment</DialogTitle>
			<DialogContent>
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
							minDate={MINDATE}
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
							placeholder="08:00"
							value={moment(time, ["h:m a", "H:m"])}
							onChange={(time) => {
								setTime(time);
								setTimeChanged(true);
							}}
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
				<div style={{ display: "flex", justifyContent: "space-evenly" }}>
					<button className="submitButton " onClick={handleSave}>
						Save
					</button>
					<button className="submitButton " onClick={onClose}>
						Cancel
					</button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export const Tile = ({ content }) => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const gapi = window.gapi;

	// const CLIENT_ID =
	//	"147177003777-9dgi8eiu3upcnk3l9talkd7q8a98l88r.apps.googleusercontent.com";
	//const API_KEY = "AIzaSyDMXo4k1iI3MuR3FKjaOJ5AUjquoazCU2U";

	const CLIENT_ID = "714553465947-8unquceqdso8f710pu2796lliuj557tk.apps.googleusercontent.com";
	const API_KEY = "AIzaSyBSWvwbpwtcFlIRfScO74mCoLwORYQngsg"

	const DISCOVERY_DOCS = [
		"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
	];
	const SCOPES = "https://www.googleapis.com/auth/calendar.events";

	const handleClick = () => {
		let starttime = content.date + "T" + content.time + ":00+02:00";
		let starthour = content.time.split(":");
		let hour = parseInt(starthour[0], 10);
		hour += 1;
		let endhour = hour + ":" + starthour[1];
		let endtime = content.date + "T" + endhour + ":00+02:00";

		gapi.load("client:auth2", () => {
			console.log("Loading client");

			gapi.client.init({
				apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES,
			});
			gapi.load("calendar", "v3", () => console.log("We did it"));
			gapi.auth2
				.getAuthInstance()
				.signIn()
				.then(() => {
					var event = {
						summary: content.title,
						location: "Kigali - Rwanda",
						description: content.title,
						start: {
							dateTime: starttime,
							timeZone: "Africa/Kigali",
						},
						end: {
							dateTime: endtime,
							timeZone: "Africa/Kigali",
						},
						recurrence: ["RRULE:FREQ=DAILY;COUNT=1"],
						attendees: [{ email: content.contact.email }],
						reminders: {
							useDefault: false,
							overrides: [
								{ method: "email", minutes: 24 * 60 },
								{ method: "popup", minutes: 10 },
							],
						},
					};

					var request = gapi.client.calendar.events.insert({
						calendarId: "primary",
						resource: event,
						sendUpdates: "all",
					});

					request.execute(function (event) {
						window.open(event.htmlLink);
					});
				});
		});
	};

	const handleEdit = () => {
		setOpen(true);
	};

	return (
		<>
			{open && (
				<EditDialog open={open} onClose={handleClose} appointment={content} />
			)}
			<div className="tileContainer">
				<div className="tileDiv tileLeft">
					<p>{content.name ? content.name : content.title}</p>
				</div>
				{content.contact ? (
					<div className="tileDiv tileCenter">
						<p>{`with ${content.contact.name}`}</p>
					</div>
				) : null}
				<div className="tileDiv tileCenter2">
					<p>{`${content.phone ? content.phone : content.date}`}</p>
				</div>
				<div className="tileDiv tileRight">
					<p>{`${content.email ? content.email : content.time}`}</p>
				</div>
				{content.title ? (
					<>
						<Button onClick={handleEdit}>
							<Edit />
						</Button>
						<Button
							variant="contained"
							startIcon={<Event />}
							onClick={handleClick}
							style={{
								backgroundColor: "#1e776e",
								color: "white",
							}}
						>
							Add To Google
						</Button>
					</>
				) : (
					""
				)}
			</div>
		</>
	);
};
