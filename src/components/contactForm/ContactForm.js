import React from "react";
import { TextField } from "@material-ui/core";

export const ContactForm = ({
	name,
	setName,
	phone,
	setPhone,
	email,
	setEmail,
	handleSubmit,
}) => {
	return (
		<div className="formBody">
			<TextField
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={name}
				onChange={(e) => setName(e.target.value)}
				label="Name"
				color="primary"
				name="name"
				type="text"
				style={{ margin: "10px", width: "98%" }}
				variant="outlined"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				label="Phone"
				color="primary"
				name="phone"
				placeholder="+250-000-000-000"
				type="phone"
				style={{ margin: "10px", width: "98%" }}
				variant="outlined"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<TextField
				style={{ margin: "10px", width: "98%" }}
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				label="Email"
				color="primary"
				name="email"
				type="email"
				variant="outlined"
				InputLabelProps={{
					shrink: true,
				}}
			/>
			<button className="submitButton" onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
};
