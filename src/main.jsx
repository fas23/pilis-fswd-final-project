import {createRoot} from 'react-dom/client';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 👇️ wrap App in Router
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
/* import React from 'react'
root.render(
  <Router>
    <App />
  </Router>
);
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
*/


