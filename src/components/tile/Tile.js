import React from "react";

export const Tile = ({ content }) => {
  const gapi = window.gapi;
  const CLIENT_ID =
    "147177003777-9dgi8eiu3upcnk3l9talkd7q8a98l88r.apps.googleusercontent.com";
  const API_KEY = "AIzaSyDMXo4k1iI3MuR3FKjaOJ5AUjquoazCU2U";
  const DISCOVERY_DOCS = [
    "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
  ];
  const SCOPES = "https://www.googleapis.com/auth/calendar.events";

  const handleClick = () => {
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
            summary: "Google I/O 2015",
            location: "800 Howard St., San Francisco, CA 94103",
            description:
              "A chance to hear more about Google's developer products.",
            start: {
              dateTime: "2015-05-28T09:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            end: {
              dateTime: "2015-05-28T17:00:00-07:00",
              timeZone: "America/Los_Angeles",
            },
            recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
            attendees: [
              { email: "lpage@example.com" },
              { email: "sbrin@example.com" },
            ],
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
          });

          request.execute(function (event) {
            window.open(event.htmlLink);
          });
        });
    });
  };
  return (
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
      <button onClick={handleClick}>Add Event</button>
    </div>
  );
};
