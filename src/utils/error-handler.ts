import { toast } from "sonner";

const errorHandler = (error: any) => {
	if (typeof error === "number") {
		if (error >= 499) {
			toast.error("Something went wrong on the server. Please try again late.");
		} else {
			toast.error("Bad Request. Please try again later.");
		}
	} else {
		toast.error(error.meessage);
	}
};

export default errorHandler;
