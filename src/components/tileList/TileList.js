import React from "react";
import { Tile } from "../tile/Tile";

export const TileList = ({ contents }) => {
	return (
		<div>
			{contents?.map((content) => (
				<Tile content={content} />
			))}
		</div>
	);
};
