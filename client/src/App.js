import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header.components";
import HomePage from "./pages/HomePage/HomePage.pages";
import FlashPage from "./pages/FlashCardsPage/FlashCardsPage.pages";
import CreateEditPage from "./pages/CreateEditPage/CreateEditPage.pages";
import CharacterPage from "./pages/CharacterPage/CharacterPage.pages";
import LoginPage from "./pages/LoginPage/LoginPage.pages";
import SignUpPage from "./pages/SignUpPage/SignUpPage.pages";
import api from "./components/api/api.js";

const App = () => {
  const [data, setData] = useState([]);
  const [currentUser, setUser] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [currentDifficulty, setDifficulty] = useState("");
  const [id, setID] = useState("");
  const [editing, setEdit] = useState(false);
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const dateInputRef = useRef();
  const idInputRef = useRef();
  const inputRefs = {
    nameInputRef,
    emailInputRef,
    passInputRef,
    dateInputRef,
    idInputRef,
  };

  const getUsers = async () => {
    const users = await api.get("/users");
    return users;
  };
  const getData = async () => {
    try {
      const users = await getUsers();
      setData(users.data || []);
    } catch (e) {
      console.error(e.response);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [filteredData]);

  const search = (e) => {
    if (e.target.value === "") setFilteredData([]);
    else if (data.length > 0)
      setFilteredData(
        data.filter((item) =>
          item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
  };
  const setupEdit = (bool) => {
    setEdit(bool);
  };
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
        api.defaults.headers.common["Authorization"] = res.data.genToken;
        return res.data.user;
      } else throw new Error();
    } catch (e) {
      console.error(e);
    }
  };
  const onSignup = async () => {
    try {
      const [emailInput, passInput, nameInput, dateInput, idInput] = [
        emailInputRef.current,
        passInputRef.current,
        nameInputRef.current,
        dateInputRef.current,
        idInputRef.current,
      ];
      const res = await api.post("/users", {
        email: emailInput.value || "",
        password: passInput.value || "",
        name: nameInput.value || "",
        dateOfBirth: dateInput.value || "",
        idNumber: idInput.value || "",
      });

      setUser(res.data.user);
      window.localStorage.setItem("token", res.data.genToken);
      api.defaults.headers.common["Authorization"] =
        window.localStorage.getItem("token");
      await getData();
      return res.data.user;
    } catch (e) {
      console.error(e.response);
    }
  };
  const logout = async () => {
    try {
      await api.post("/users/logout");
      setUser({});
      window.localStorage.removeItem("token");
    } catch (e) {
      console.error(e.response);
    }
  };
  useEffect(() => {
    onLogin();
  }, []);

  return (
    <BrowserRouter>
      <Header setEdit={setupEdit} user={currentUser} logout={logout} />
      <Route path="/" exact>
        <HomePage data={data} search={search} filteredData={filteredData} />
      </Route>
      <Route path="/create">
        <CreateEditPage
          data={data}
          editID={id}
          editing={editing}
          setEdit={setupEdit}
          getData={getData}
          currentUser={currentUser}
        />
      </Route>
      <Route path="/flash">
        <FlashPage
          data={data}
          currentDifficulty={currentDifficulty}
          setDifficulty={setDifficulty}
        />
      </Route>
      {data.length > 0 &&
        data.map((char) => {
          return (
            <Route key={char._id} path={`/${char._id}`} exact>
              <CharacterPage
                char={char}
                getData={getData}
                editID={id}
                setID={setID}
                editing={editing}
                setEdit={setupEdit}
                currentUser={currentUser}
              />
            </Route>
          );
        })}
      <Route path="/login">
        <LoginPage
          inputRefs={inputRefs}
          onLogin={onLogin}
          currentUser={currentUser}
          loggedIn={currentUser.hasOwnProperty("name")}
        />
      </Route>

      <Route path="/signup">
        <SignUpPage
          inputRefs={inputRefs}
          onSignup={onSignup}
          currentUser={currentUser}
        />
      </Route>
    </BrowserRouter>
  );
};

export default App;
