import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import AuthProvider from "./components/AuthContext";
import GlobalStyles from "./components/GlobalStyles";

ReactDOM.render(
  <AuthProvider>
    <GlobalStyles />
    <App />
  </AuthProvider>,
  document.getElementById("root")
);
