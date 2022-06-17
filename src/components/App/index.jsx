import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import LoginPage from "../pages/LoginPage/";
import SignupPage from "../pages/SignupPage";
import TimelinePage from "../pages/TimelinePage/";
import UserPage from "../pages/UserPage";
import HashtagPage from "../pages/HashtagPage/";

import GlobalStyle from "../../assets/styles/GlobalStyle";
import ResetCSS from "../../assets/styles/ResetCSS";

export default function App() {
  const [token, setToken] = useState();
  const [hashtag, setHashtag] = useState();
  return (
    <UserContext.Provider value={{ token, setToken, hashtag, setHashtag }}>
      <BrowserRouter>
        <ResetCSS />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
