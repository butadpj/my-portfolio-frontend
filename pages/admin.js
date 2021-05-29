import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import useSetLocalItem from "../hooks/useSetLocalItem";

import Login from "../components/Login";

const admin = () => {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });
  const [attemptCounter, setAttemptCounter] = useState(1);
  const [state, dispatch] = useContext(TokenContext);
  const router = useRouter();

  const handleInputChange = (e) => {
    let input = e.target.name;

    if (input == "username") {
      let value = e.target.value;
      setLoginInfo({ ...loginInfo, username: value });
    }
    if (input == "password") {
      let value = e.target.value;
      setLoginInfo({ ...loginInfo, password: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Username: ", loginInfo.username);
    // console.log("Password: ", loginInfo.password);
    try {
      const getTokenUrl = `${process.env.devHost}/api/token/`;

      const res = await fetch(getTokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: loginInfo.username,
          password: loginInfo.password,
        }),
      });

      const data = await res.json(); // Refresh & Access Token
      if (data.access && data.refresh) {
        //? LOCAL STORAGE
        useSetLocalItem("accessToken", data.access, 300); //Expires in 5 mins
        useSetLocalItem("refreshToken", data.refresh, 300); //Expires in 5 mins
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { accessToken: data.access, refreshToken: data.refresh },
        });
        setAttemptCounter(0);
        router.push("/");
      } else {
        setLoginInfo({ ...loginInfo, password: "" });
        setAttemptCounter((prev) => {
          return prev + 1;
        });
        if (attemptCounter === 1) alert("I'm sorry but you're not Paul");
        if (attemptCounter === 2) alert("You can't enter if you're not Paul");
        if (attemptCounter === 3) alert("Bruhh... Seriously!!!??");
        if (attemptCounter > 3) alert("Oh God please! Get some help bro");
      }
    } catch (err) {
      alert("There's an error occured. Don't worry it's not your fault");
      console.log(err);
    }
  };

  const handleLogout = async (e) => {
    const logoutURL = `${process.env.devHost}/api/v1/users/logout/blacklist/`;

    try {
      const res = await fetch(logoutURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh_token: state.refreshToken, //? LOCAL STORAGE
        }),
      });

      //? LOCAL STORAGE
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      
      dispatch({
        type: "LOGOUT",
      });

      router.push("/");
    } catch (err) {
      alert("There's an error occured. Don't worry it's not your fault");
      console.log(err);
    }
  };

  return (
    <Login
      state={state}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      handleLogout={handleLogout}
      loginInfo={loginInfo}
    />
  );
};

export default admin;
