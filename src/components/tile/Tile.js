import React from "react";

export const Tile = ({ content }) => {
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
		</div>
	);
};
