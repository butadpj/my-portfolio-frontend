import { useRouter } from "next/router";
import Head from "next/head";
import { useState, useContext } from "react";
import { TokenContext } from "../context/TokenContext";
import useSetLocalItem from "../hooks/useSetLocalItem";

import Login from "../components/Login";

const admin = () => {
  const [loginInfo, setLoginInfo] = useState({ username: "", password: "" });

  const [attemptCounter, setAttemptCounter] = useState(1); // Login attempt counter
  const [tokenState, tokenDispatch] = useContext(TokenContext); // TokenContext
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

    try {
      const getTokenUrl = `${process.env.devHost}/api/token/`;

      // Get a token from /api/token
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

      const data = await res.json(); // data -> Refresh & Access Token

      // If Login -> SUCCESS
      if (data.access && data.refresh) {
        //? LOCAL STORAGE
        // Put the token that expires in 300 seconds (5 mins) in local storage
        useSetLocalItem("accessToken", data.access, 300);
        useSetLocalItem("refreshToken", data.refresh, 300);

        // Save the tokens to state
        tokenDispatch({
          type: "LOGIN_SUCCESS",
          payload: { accessToken: data.access, refreshToken: data.refresh },
        });

        setAttemptCounter(0); // Reset the attempt counter

        router.push("/"); // Redirect to home page
      }
      // If Login -> FAILED
      else {
        setLoginInfo({ ...loginInfo, password: "" }); // Reset password field

        // Add 1 to counter
        setAttemptCounter((prev) => {
          return prev + 1;
        });

        // Bruh moments login attempt messages
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
          refresh_token: tokenState.refreshToken, // Get the refresh token from memory
        }),
      });

      // Remove the tokens from local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Reset tokenContext states
      tokenDispatch({
        type: "LOGOUT",
      });

      router.push("/"); // Redirect to home page
    } catch (err) {
      alert("There's an error occured. Don't worry it's not your fault");
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>Paul's Portfolio | Admin</title>
      </Head>
      <Login
        state={tokenState}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleLogout={handleLogout}
        loginInfo={loginInfo}
      />
    </>
  );
};

export default admin;
