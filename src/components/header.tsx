import React from "react";
import AddToDo from "./AddTodo";

const Header: React.FC = () => {
	return (
		<div className="screen">
			<div className="mb-4 flex items-center justify-between border-b pb-4">
				<h1 className="text-2xl font-semibold">ToDo App</h1>
				<AddToDo />
			</div>
		</div>
	);
};

export default Header;
