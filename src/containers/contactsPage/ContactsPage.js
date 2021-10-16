import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";
import { setContacts } from "../../store/actions/contactsActions";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";
import Alert from "../../components/alert/Alert";

export const ContactsPage = () => {
	const { contacts } = useSelector((state) => state.contacts);
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [showAlert, setShowAlert] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	let errors = [];
	const [passedErrors, setPassedErrors] = useState([]);

	const handleValidation = (name, phone, email) => {
		let formIsValid = true;

		//Name
		if (name === "") {
			console.log("name:", name);
			errors.push("Name Cannot be empty");
			formIsValid = false;
		}

		if (typeof name !== "undefined") {
			if (!name.match(/^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/)) {
				errors.push("Only alpha-numeric characters");
				formIsValid = false;
			}
		}

		if (contacts.find((contact) => contact.name === name)) {
			errors.push("There is a contact with the same name");
			formIsValid = false;
		}

		//Phone
		if (phone === "") {
			errors.push("Name Cannot be empty");
			formIsValid = false;
		}

		if (typeof phone !== "undefined") {
			if (
				!phone.match(
					/^\+?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})?[-. ]?([0-9]{3})$/
				)
			) {
				errors.push("Invalid phone number");
				formIsValid = false;
			}
		}

		if (contacts.find((contact) => contact.phone === phone)) {
			errors.push("There is a contact with the same phone number");
			formIsValid = false;
		}

		//Email
		if (email === "") {
			errors.push("Email Cannot be empty");
			formIsValid = false;
		}

		if (typeof email !== "undefined") {
			let lastAtPos = email.lastIndexOf("@");
			let lastDotPos = email.lastIndexOf(".");

			if (
				!(
					lastAtPos < lastDotPos &&
					lastAtPos > 0 &&
					email.indexOf("@@") === -1 &&
					lastDotPos > 2 &&
					email.length - lastDotPos > 2
				)
			) {
				errors.push("Email is not valid");
				formIsValid = false;
			}
		}

		if (contacts.find((contact) => contact.email === email)) {
			errors.push("There is a contact with the same email");
			formIsValid = false;
		}

		return formIsValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const valid = handleValidation(name, phone, email);

		if (valid === false) {
			openAlert();
			return;
		} else {
			contacts.push({ name, phone, email });
			dispatch(setContacts(contacts));
			setShowSuccess(true);
			setName("");
			setPhone("");
			setEmail("");
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
					<h2>Add Contact</h2>
					<button className="toggleButton">
						{showForm ? <BsChevronCompactUp /> : <BsChevronCompactDown />}
					</button>
				</div>
				{showForm ? (
					<ContactForm
						name={name}
						setName={setName}
						phone={phone}
						setPhone={setPhone}
						email={email}
						setEmail={setEmail}
						handleSubmit={handleSubmit}
					/>
				) : null}
			</div>
			<div className="listWrapper">
				<h2>Contacts</h2>
				<TileList contents={contacts} />
			</div>
		</>
	);
};
