import { Switch, Textarea } from "@mui/joy";
import Button from "@mui/joy/Button";
import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { addItem } from "../../services/api";
import { Item } from "../../utils/type";
import errorHandler from "../../utils/error-handler";
import { addItemList } from "../List/state";
import { toast } from "sonner";

const AddButton: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [item, setItem] = useState<Item>({ userId: 1, id: 0, title: "", completed: false });
	const [disabled, setDisabled] = useState(false);

	const onAdd = async () => {
		setDisabled(true);

		try {
			const response = await addItem(item);

			if (response.ok) {
				addItemList(await response.json());
				toast.success("Item added successfully");
			} else {
				throw response.status;
			}

			setIsOpen(false);
		} catch (error) {
			errorHandler(error);
		}

		setDisabled(false);
	};

	useEffect(() => {
		setItem({ userId: 1, id: 0, title: "", completed: false });
	}, [isOpen]);

	return (
		<>
			<div
				data-open={isOpen}
				className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-white/30 backdrop-blur transition-opacity data-[open='false']:pointer-events-none data-[open='false']:opacity-0"
			>
				<div className="relative flex w-full max-w-[500px] flex-col rounded-lg border bg-white p-4 shadow-lg">
					<button
						onClick={() => setIsOpen(false)}
						className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 rounded-full border-white bg-red-500 p-1 text-2xl text-white outline-2 outline-red-500 transition-colors hover:bg-red-800 focus-visible:border-2 focus-visible:outline"
					>
						<FaXmark />
					</button>
					<h1 className="mb-4 text-center text-lg font-semibold">Add Item</h1>
					<div className="mb-4">
						<label>Title</label>
						<Textarea
							value={item.title}
							minRows={3}
							maxRows={10}
							onChange={(e) => setItem((prev) => ({ ...prev, title: e.target.value }))}
						/>
					</div>
					<div className="mb-4 flex w-full items-center justify-between">
						<label>Completed</label>
						<Switch
							checked={item.completed}
							onChange={(e) => setItem((prev) => ({ ...prev, completed: e.target.checked }))}
						/>
					</div>
					<div className="flex justify-end gap-4">
						<Button color="success" disabled={disabled} onClick={onAdd}>
							add
						</Button>
					</div>
				</div>
			</div>
			<Button onClick={() => setIsOpen(true)} className="flex items-center gap-2">
				<FaPlus />
				Add
			</Button>
		</>
	);
};

export default AddButton;
