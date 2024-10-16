import React from "react";
import AddButton from "./AddButton";

const Header: React.FC = () => {
	return (
		<div className="screen top-0">
			<div className="mb-4 flex items-center justify-between border-b pb-4">
				<h1 className="text-2xl font-semibold">ToDo App</h1>
				<AddButton />
			</div>
		</div>
	);
};

export default Header;
