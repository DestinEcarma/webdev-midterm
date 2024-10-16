import { Item } from "../utils/type";

const API = "https://jsonplaceholder.typicode.com";

const DEFAULT_OPTIONS = {
	headers: {
		"Content-Type": "application/json",
	},
};

const GET_REQUEST = {
	...DEFAULT_OPTIONS,
	method: "GET",
};

const POST_REQUEST = {
	...DEFAULT_OPTIONS,
	method: "POST",
};

const PUT_REQUEST = {
	...DEFAULT_OPTIONS,
	method: "PUT",
};

const DELETE_REQUEST = {
	...DEFAULT_OPTIONS,
	method: "DELETE",
};

export const getItems = async () => {
	return fetch(`${API}/todos`, GET_REQUEST);
};

export const getItem = async (id: number) => {
	return fetch(`${API}/todos/${id}`, GET_REQUEST);
};

export const addItem = async (item: Item) => {
	return fetch(`${API}/todos`, {
		...POST_REQUEST,
		body: JSON.stringify(item),
	});
};

export const editItem = async (item: Item) => {
	return fetch(`${API}/todos/${item.id}`, {
		...PUT_REQUEST,
		body: JSON.stringify(item),
	});
};

export const deleteItem = async (id: number) => {
	return fetch(`${API}/todos/${id}`, DELETE_REQUEST);
};
