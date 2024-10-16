import EventEmitter from "eventemitter3";
import { Item } from "../../utils/type";

const eventEmitter = new EventEmitter();

export const setItemList = (items: Item[]) => {
	eventEmitter.emit("set", items);
};

export const addItemList = (item: Item) => {
	eventEmitter.emit("add", item);
};

export const updateItemList = (item: Item) => {
	eventEmitter.emit("update", item);
};

export const deleteItemList = (id: number) => {
	eventEmitter.emit("delete", id);
};

export const useItemList = () => {
	return eventEmitter;
};
