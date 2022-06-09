import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header.components";
import CreateEditPage from "./pages/CreateEditPage/CreateEditPage.pages";
import LoginPage from "./pages/LoginPage/LoginPage.pages";
import api from "./components/api/api.js";

const App = () => {
	const [data, setData] = useState([]);
	const [currentUser, setUser] = useState({});
	const emailInputRef = useRef();
	const passInputRef = useRef();
	const inputRefs = {
		emailInputRef,
		passInputRef,
	};

	const getUsers = async () => {
		try {
			const users = await api.get("/users");
			setData(users.data || []);
		} catch (e) {
			console.error(e.response);
		}
	};

	useEffect(() => {
		if (currentUser.isManager) getUsers();
		// eslint-disable-next-line
	}, [currentUser]);

	const onLogin = async () => {
		try {
			const [emailInput, passInput] = [emailInputRef.current, passInputRef.current];
			let res;
			if (window.localStorage.getItem("token")) {
				res = await api.post("/users/login", {
					token: window.localStorage.getItem("token"),
				});
			} else {
				res = await api.post("/users/login", {
					email: emailInput.value || "",
					password: passInput.value || "",
					token: window.localStorage.getItem("token"),
				});
			}
			if (res.status === 200) {
				setUser(res.data.user);
				if (!window.localStorage.getItem("token")) window.localStorage.setItem("token", res.data.genToken);
				api.defaults.headers.common["Authorization"] = window.localStorage.getItem("token");
				return res.data.user;
			} else throw new Error();
		} catch (e) {
			console.error(e);
		}
	};

	useEffect(() => {
		onLogin();
	}, []);

	return (
		<BrowserRouter>
			<Header user={currentUser} setUser={setUser} />

			<Route path="/create">
				<CreateEditPage data={data} getData={getUsers} currentUser={currentUser} />
			</Route>

			<Route path="/login">
				<LoginPage
					inputRefs={inputRefs}
					onLogin={onLogin}
					currentUser={currentUser}
					loggedIn={currentUser.hasOwnProperty("name")}
				/>
			</Route>
		</BrowserRouter>
	);
};

export default App;
