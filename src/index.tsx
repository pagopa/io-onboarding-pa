import "../node_modules/react-app-polyfill/ie11";
import "../node_modules/react-app-polyfill/stable";

import React from "react";
import { render } from "react-dom";

import "./i18n";

import { App } from "./App";
import { AlertContextProvider } from "./context/alert-context";
import { LoadingPageContextProvider } from "./context/loading-page-context";
import { TokenContextProvider } from "./context/token-context";

const app = (
  <TokenContextProvider>
    <AlertContextProvider>
      <LoadingPageContextProvider>
        <App />
      </LoadingPageContextProvider>
    </AlertContextProvider>
  </TokenContextProvider>
);

render(app, document.getElementById("root"));
