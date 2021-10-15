import React from "react";
import { TextField, MenuItem } from "@material-ui/core";

export const ContactPicker = ({ contacts, onChange, selectedContact }) => {
	return (
		<TextField
			labelId="demo-simple-select-outlined-label"
			id="demo-simple-select-outlined"
			value={selectedContact}
			onChange={(e) => onChange(e.target.value)}
			label="Select a Contact"
			color="primary"
			name="contact"
			type="text"
			variant="outlined"
			style={{ margin: "10px", width: "98%" }}
			select
			InputLabelProps={{
				shrink: true,
			}}
		>
			<MenuItem value="">
				<em>None</em>
			</MenuItem>
			{contacts &&
				contacts.map((item) => (
					<MenuItem key={item.name} value={item}>
						<div>
							<h3 style={{ textAlign: "left" }}>{item.name}</h3>
						</div>
					</MenuItem>
				))}
		</TextField>
	);
};
