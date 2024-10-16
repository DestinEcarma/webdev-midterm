import Button from "@mui/joy/Button";
import React, { useState } from "react";

const AddToDo: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div data-open={isOpen} className="absolute"></div>
			<Button onClick={() => setIsOpen(true)}>Add</Button>
		</>
	);
};

export default AddToDo;
