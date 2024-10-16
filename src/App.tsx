import List from "./components/List";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { Item } from "./utils/type";
import { getItems } from "./services/api";
import errorHandler from "./utils/error-handler";
import { setItemList, useItemList } from "./components/List/state";

function App() {
	const [items, setItems] = useState<Item[]>([]);
	const observer = useItemList();

	useEffect(() => {
		const addItem = (item: Item) => setItems((prev) => [...prev, item]);
		const updateItem = (item: Item) => setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
		const deleteItem = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

		observer.on("set", setItems);
		observer.on("add", addItem);
		observer.on("update", updateItem);
		observer.on("delete", deleteItem);

		return () => {
			observer.off("set", setItems);
			observer.off("add", addItem);
			observer.off("update", updateItem);
			observer.off("delete", deleteItem);
		};
	}, [observer, setItems]);

	useEffect(() => {
		getItems()
			.then((response) => {
				if (response.ok) return response.json();
				throw response.status;
			})
			.then((data: Item[]) => {
				setItemList(data);
			})
			.catch(errorHandler);
	}, []);

	return (
		<>
			<Header />
			<div className="screen h-full">
				<List items={items} />
			</div>
		</>
	);
}

export default App;
