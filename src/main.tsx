import { createRoot } from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./app/store.ts";

createRoot(document.getElementById("root")!).render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
);