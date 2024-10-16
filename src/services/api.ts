const API = "https://jsonplaceholder.typicode.com";

const DEFAULT_OPTIONS = {
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
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
