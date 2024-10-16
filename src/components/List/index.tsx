import React, { useEffect, useRef, useState } from "react";
import { Item } from "../../utils/type";
import { useIntersection } from "@mantine/hooks";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { ItemSet } from "../ItemModal";

interface ListProps {
	items: Item[];
}

interface RowProps extends Item {
	key: React.Key;
}

const Row = React.forwardRef<HTMLTableRowElement, RowProps>(({ id, title, completed, key }, ref) => {
	const openItem = () => {
		ItemSet(id);
	};

	return (
		<tr
			ref={ref}
			key={key}
			className="transition-colors [&:has(a:focus)]:bg-gray-200 [&:has(a:hover)]:bg-gray-200 [&:not(:last-child)]:border-b"
		>
			<td className="p-2 text-center font-semibold">
				<a onClick={openItem} className="cursor-pointer">
					{id}
				</a>
			</td>
			<td className="p-2">
				<a onClick={openItem} className="cursor-pointer">
					{title}
				</a>
			</td>
			<td className="p-2">
				<div className="flex justify-center text-2xl">
					{completed ? <FaCheck className="text-green-500" /> : <FaXmark className="text-red-500" />}
				</div>
			</td>
		</tr>
	);
});

const List: React.FC<ListProps> = ({ items }) => {
	const [display, setDisplay] = useState(30);
	const lastItemRef = useRef<HTMLTableRowElement>(null);
	const { ref, entry } = useIntersection({
		root: lastItemRef.current,
		threshold: 1,
	});

	useEffect(() => {
		if (entry?.isIntersecting) {
			setDisplay((prev) => prev + 15);
		}
	}, [entry]);

	const _items = items.slice(0, display);

	return (
		<div className="pb-8">
			<table className="w-full">
				<thead>
					<tr className="border-b">
						<th className="px-4 py-2">ID</th>
						<th className="w-full py-2 text-left">Title</th>
						<th className="px-4 py-2">Completed</th>
					</tr>
				</thead>
				<tbody>
					{_items.map((item, i) => {
						if (i === _items.length - 1) return <Row {...item} ref={ref} key={item.id} />;
						return <Row {...item} key={item.id} />;
					})}
				</tbody>
			</table>
		</div>
	);
};

export default List;
