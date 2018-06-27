import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./index.css";
import logger from "redux-logger";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import App from "./App";
import rootReducer from "./reducers";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Raleway", "sans serif"]
  },
  palette: {
    primary: {
      main: "#6C2DFC"
    }
  }
});
const middleware = applyMiddleware(thunk, logger);
const store = createStore(rootReducer, middleware);

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);
