import React, { useEffect, useState } from "react";
import { Item } from "../../utils/type";
import EventEmitter from "eventemitter3";
import { FaXmark } from "react-icons/fa6";
import { deleteItem, editItem, getItem } from "../../services/api";
import errorHandler from "../../utils/error-handler";
import { Button, Switch, Textarea } from "@mui/joy";
import { deleteItemList, updateItemList } from "../List/state";
import { toast } from "sonner";

const eventEmitter = new EventEmitter();

interface ItemModalProps {
	isOpen: boolean;
	id: number;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ItemModal: React.FC<ItemModalProps> = ({ isOpen, id, setIsOpen }) => {
	const [item, setItem] = useState<Item>({ id, title: "", completed: false });
	const [isLoading, setIsLoading] = useState(false);
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		setItem({ id, title: "", completed: false });
		if (!isOpen) return;

		setIsLoading(true);
		setDisabled(true);
		getItem(id)
			.then((response) => {
				if (response.ok) return response.json();
				throw response.status;
			})
			.then((data: Item) => {
				setItem(data);
			})
			.catch((error) => {
				errorHandler(error);
				setIsOpen(false);
			})
			.finally(() => {
				setIsLoading(false);
				setDisabled(false);
			});
	}, [id, isOpen, setItem, setIsOpen]);

	const onDelete = async () => {
		setDisabled(true);

		try {
			const response = await deleteItem(id);

			if (response.ok) {
				deleteItemList(id);
				toast.success("Item deleted successfully");
			} else {
				throw response.status;
			}

			setIsOpen(false);
		} catch (error) {
			setDisabled(false);
			errorHandler(error);
		}
	};

	const onSave = async () => {
		setDisabled(true);

		try {
			const response = await editItem(item);

			if (response.ok) {
				updateItemList(await response.json());
				toast.success("Item updated successfully");
			} else {
				throw response.status;
			}

			setIsOpen(false);
		} catch (error) {
			setDisabled(false);
			errorHandler(error);
		}
	};

	return (
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
				<h1 className="mb-4 text-center text-lg font-semibold">Edit Item ID: {isLoading ? "..." : id}</h1>
				<div className="mb-4">
					<label>Title</label>
					<Textarea
						value={isLoading ? "..." : item.title}
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
				<div className="flex justify-between gap-4">
					<Button color="danger" disabled={disabled} onClick={onDelete}>
						Delete
					</Button>
					<Button color="success" disabled={disabled} onClick={onSave}>
						Save
					</Button>
				</div>
			</div>
		</div>
	);
};

export const ItemSet = async (id: number) => {
	eventEmitter.emit("modal", id);
};

export const ItemDisplay: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [id, setId] = useState(0);

	useEffect(() => {
		const handler = (id: number) => {
			setIsOpen(true);
			setId(id);
		};

		eventEmitter.on("modal", handler);

		return () => {
			eventEmitter.off("modal", handler);
		};
	}, [setIsOpen, setId]);

	return <ItemModal isOpen={isOpen} id={id} setIsOpen={setIsOpen} />;
};
