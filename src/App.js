import React from "react";
import { Switch, Route, Redirect, NavLink } from "react-router-dom";

import { AppointmentsPage } from "./containers/appointmentsPage/AppointmentsPage";
import { ContactsPage } from "./containers/contactsPage/ContactsPage";

function App() {
	const ROUTES = {
		CONTACTS: "/contacts",
		APPOINTMENTS: "/appointments",
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<div className="header">
				<div className="navigation">
					<div className="links">
						<NavLink to={ROUTES.CONTACTS} activeClassName="active">
							Contacts
						</NavLink>
						<NavLink to={ROUTES.APPOINTMENTS} activeClassName="active">
							Appointments
						</NavLink>
					</div>
				</div>
			</div>
			<div className="container">
				<Switch>
					<Route exact path="/">
						<Redirect to={ROUTES.CONTACTS} />
					</Route>
					<Route path={ROUTES.CONTACTS}>
						<ContactsPage />
					</Route>
					<Route path={ROUTES.APPOINTMENTS}>
						<AppointmentsPage />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default App;
