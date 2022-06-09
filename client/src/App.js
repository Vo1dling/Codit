import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header.components";
import UserTable from "./pages/UserTablePage/UserTablePage.pages";
import LoginPage from "./pages/LoginPage/LoginPage.pages";
import api from "./components/api/api.js";
import TaskTable from "./pages/TaskPage/TaskPage.pages";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [currentUser, setUser] = useState({});
  const [errorMessage, setError] = useState("");
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const inputRefs = {
    emailInputRef,
    passInputRef,
  };

  const getUsers = async () => {
    try {
      const users = await api.get("/users");
      setUserData(users.data || []);
    } catch (e) {
      console.error(e.response);
    }
  };
  const getTasks = async () => {
    try {
      const tasks = await api.get("/tasks");
      setTaskData(tasks.data || []);
    } catch (e) {
      console.error(e.response);
    }
  };

  useEffect(() => {
    if (currentUser.isManager) {
      getUsers();
      getTasks();
    } else {
      setTaskData(currentUser.tasks);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  const onLogin = async () => {
    try {
      const [emailInput, passInput] = [
        emailInputRef.current,
        passInputRef.current,
      ];
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
        if (!window.localStorage.getItem("token"))
          window.localStorage.setItem("token", res.data.genToken);
        api.defaults.headers.common["Authorization"] =
          window.localStorage.getItem("token");
        return res.data.user;
      } else throw new Error();
    } catch (e) {
      setError("Unable To Login");
      console.error(e.message);
    }
  };
  const getProfile = async () => {
    try {
      const user = await api.get("/users/me");
      setUser(user.data);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    onLogin();
  }, []);
  useEffect(() => {
    setError("");
  }, []);

  return (
    <BrowserRouter>
      <Header
        user={currentUser}
        setUser={setUser}
        setTaskData={setTaskData}
        setUserData={setUserData}
      />

      <Route path="/userTable">
        <UserTable
          data={userData}
          getData={getUsers}
          currentUser={currentUser}
        />
      </Route>

      <Route path="/taskTable">
        <TaskTable
          taskData={taskData}
          userData={userData}
          getData={currentUser.isManager ? getTasks : getProfile}
          currentUser={currentUser}
        />
      </Route>

      <Route exact path="/">
        <LoginPage
          inputRefs={inputRefs}
          onLogin={onLogin}
          currentUser={currentUser}
          errorMessage={errorMessage}
          loggedIn={currentUser.hasOwnProperty("name")}
        />
      </Route>
    </BrowserRouter>
  );
};

export default App;
