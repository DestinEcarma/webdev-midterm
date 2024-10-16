import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/inter";
import { Toaster } from "sonner";
import { ItemDisplay } from "./components/ItemModal/index.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
		<ItemDisplay />
		<Toaster richColors duration={5000} closeButton position="top-center" />
	</StrictMode>,
);
