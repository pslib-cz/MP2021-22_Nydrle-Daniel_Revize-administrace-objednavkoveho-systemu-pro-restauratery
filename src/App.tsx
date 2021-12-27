import React, { useState } from "react";
import logo from "./logo.svg";
import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "./providers/Provider";
import Home from "./components/Home";

import "./scss/main.scss"
import Login from "./components/Login";

function App() {
	return (
		<div className="App">
			<Provider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/" element={<Home />} />
						<Route path="/home" element={<Home />} />
					</Routes>
				</BrowserRouter>
			</Provider>
		</div>
	);
}

export default App;
