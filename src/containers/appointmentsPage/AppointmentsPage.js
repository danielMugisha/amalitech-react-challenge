import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppointmentForm } from "../../components/appointmentForm/AppointmentForm";
import { TileList } from "../../components/tileList/TileList";
import { setAppointments } from "../../store/actions/appointmentsActions";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import Alert from "../../components/alert/Alert";

export const AppointmentsPage = () => {
	const { contacts } = useSelector((state) => state.contacts);
	const { appointments } = useSelector((state) => state.appointments);
	const dispatch = useDispatch();

	const [contact, setContact] = useState(null);
	const [title, setTitle] = useState("");
	const [date, setDate] = useState(new Date());
	const [time, setTime] = useState(new Date().getTime());
	const [showForm, setShowForm] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	let errors = [];
	const [passedErrors, setPassedErrors] = useState([]);

	const dateFormat = (date) => {
		const [month, day, year] = date.toLocaleDateString("en-US").split("/");
		return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
	};

	const timeFormat = (time) => {
		const [hour, minute] = time
			.toTimeString()
			.toString()
			.split(" ")[0]
			.split(":");
		return `${hour}:${minute}`;
	};

	const handleValidation = (title, contact) => {
		let formIsValid = true;

		//Title
		if (title === "") {
			errors.push("Title Cannot be empty");
			formIsValid = false;
		}

		//Contact
		if (contact === null || typeof contact === undefined) {
			errors.push("Contact Cannot be empty");
			formIsValid = false;
		}

		return formIsValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const valid = handleValidation(title, contact);
		const _date = dateFormat(new Date(date));
		const _time = timeFormat(new Date(time));

		if (valid === false) {
			openAlert();
			return;
		} else {
			appointments.push({ title, date: _date, time: _time, contact });
			dispatch(setAppointments(appointments));
			setShowSuccess(true);
			setTitle("");
			setDate(new Date());
			setTime(new Date().getTime());
			setContact(null);
		}
	};

	const toggleForm = () => {
		setShowForm(!showForm);
	};

	const openAlert = () => {
		setPassedErrors(errors);
		setShowAlert(true);
		console.log("errors:", errors);
	};

	const closeAlert = (bool) => {
		if (bool === "showAlert") setShowAlert(false);
		if (bool === "showSuccess") setShowSuccess(false);
	};

	return (
		<>
			{showAlert && (
				<Alert
					content={passedErrors[0]}
					onClose={() => closeAlert("showAlert")}
					open={showAlert}
				/>
			)}
			{showSuccess && (
				<Alert
					content="Successfully submitted"
					onClose={() => closeAlert("showSuccess")}
					open={showSuccess}
				/>
			)}
			<div className="form">
				<div className="formHeader" onClick={toggleForm}>
					<h2>Add Appointment</h2>
					<button className="toggleButton">
						{showForm ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
					</button>
				</div>
				{showForm ? (
					<AppointmentForm
						contacts={contacts}
						title={title}
						setTitle={setTitle}
						contact={contact}
						setContact={setContact}
						date={date}
						setDate={setDate}
						time={time}
						setTime={setTime}
						handleSubmit={handleSubmit}
					/>
				) : null}
			</div>
			<div className="listWrapper">
				<h2>Appointments</h2>
				<TileList contents={appointments} />
			</div>
		</>
	);
};
