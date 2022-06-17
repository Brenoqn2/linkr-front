import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { useState } from "react";

import { useLocalStorage } from "../../hooks/useLocalStorage";

import LoginPage from "../pages/LoginPage/";
import SignupPage from "../pages/SignupPage";
import TimelinePage from "../pages/TimelinePage/";
import UserPage from "../pages/UserPage";
import HashtagPage from "../pages/HashtagPage/";

import TokenContext from "../../contexts/tokenContext";
import UserContext from "../../contexts/userContext";

import GlobalStyle from "../../assets/styles/GlobalStyle";
import ResetCSS from "../../assets/styles/ResetCSS";

export default function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [userData, setUserData] = useLocalStorage("userData", null);

  return (
    <BrowserRouter>
      <ResetCSS />
      <GlobalStyle />
      <TokenContext.Provider value={{ token, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/users/:id" element={<UserPage />} />
            <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
          </Routes>
        </UserContext.Provider>
      </TokenContext.Provider>
    </BrowserRouter>
  );
}
