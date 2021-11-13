const getTodayString = () => {
	const [month, day, year] = new Date().toLocaleDateString("en-US").split("/");
	return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const MINDATE = getTodayString();

export const dateFormat = (date) => {
	const [month, day, year] = date.toLocaleDateString("en-US").split("/");
	return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export const timeFormat = (time) => {
	const [hour, minute] = time
		.toTimeString()
		.toString()
		.split(" ")[0]
		.split(":");
	return `${hour}:${minute}`;
};

export const handleValidation = (title, contact) => {
	let formIsValid = true;
	const errors = [];

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

	return { formIsValid, errors };
};
