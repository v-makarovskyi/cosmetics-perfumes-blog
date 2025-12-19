import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import App from "./app";
import store from "@src/redux/store";
import "bootstrap/dist/js/bootstrap";

const appContainer = document.getElementById("root");
if (appContainer) {
  const root = ReactDOM.createRoot(appContainer);
  root.render(
    /*  <React.StrictMode> */
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>

    /*  </React.StrictMode> */
  );
} else {
  throw new Error(
    `Корневой элемент с идентификатором 'root' не найден в документе. Убедитесь, что в вашем HTML-файле есть соответствующий элемент HTML с идентификатором 'root'`
  );
}
