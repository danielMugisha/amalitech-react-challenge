import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ContactForm } from "../../components/contactForm/ContactForm";
import { TileList } from "../../components/tileList/TileList";
import { setContacts } from "../../store/actions/contactsActions";
import { BsChevronCompactDown, BsChevronCompactUp } from "react-icons/bs";

export const ContactsPage = () => {
	const { contacts } = useSelector((state) => state.contacts);
	const dispatch = useDispatch();

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [showForm, setShowForm] = useState(false);
	let errors = [];

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
					email.indexOf("@@") == -1 &&
					lastDotPos > 2 &&
					email.length - lastDotPos > 2
				)
			) {
				errors.push("Email is not valid");
				formIsValid = false;
			}
		}

		return formIsValid;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const valid = handleValidation(name, phone, email);
		console.log(valid);

		if (valid === false) {
			window.alert("Fill the form correctly");
			console.log("errors:", errors);
			return;
		} else {
			if (
				contacts.find(
					(contact) => contact.phone === phone || contact.email === email
				)
			) {
				window.alert("There is a contact with the same number or email");
				return;
			} else if (contacts.find((contact) => contact.name === name)) {
				window.alert("There is a contact with the same name");
				return;
			} else {
				contacts.push({ name, phone, email });
				dispatch(setContacts(contacts));
				setName("");
				setPhone("");
				setEmail("");
			}
		}
	};

	const toggleForm = () => {
		setShowForm(!showForm);
	};

	return (
		<>
			<div className="form">
				<div className="formHeader">
					<h2>Add Contact</h2>
					<button className="toggleButton" onClick={toggleForm}>
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
