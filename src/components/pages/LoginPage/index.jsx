import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dotenv from "dotenv";

import TokenContext from "../../../contexts/tokenContext";

import ValidateThisEmailAndPass from "../../Resources/ValidateEmailAndPass";
import Loader from "../../Resources/Loader";

dotenv.config();

export default function LoginPage() {
  const API = process.env.REACT_APP_API;
  console.log("🚀 ~ file: index.jsx ~ line 18 ~ LoginPage ~ API", API)
  
  const navigate = useNavigate();
  const [data, setData] = useState({ email: null, password: null });
  const [loading, setLoading] = useState(false);
  const { setToken, token } = useContext(TokenContext);

  useEffect(() => {
    if (token) {
      navigate("/timeline");
    }
  }, []);

  function HandleSubmit(e) {
    e.preventDefault();
    setData({ ...data, loading: true });

    if (ValidateThisEmailAndPass(data.email, data.password)) {
      axios
        .post(API + "/signin", {
          email: data.email,
          password: data.password,
        })
        .then((res) => {
          console.log(res);
          setToken(res.data.token);
          navigate("/timeline");
        })
        .catch((err) => {
          alert(`ops !\n\n${err.response.data}`);
        });
    }
    setLoading(false);
  }

  return (
    <PageContainer>
      <LeftContainer>
        <h1>linkr</h1>
        <h2>save, share and discover<br />the best links on the web</h2>
      </LeftContainer>
      <RightContainer>
        <form onSubmit={HandleSubmit}>
            <input
              type="text"
              placeholder="email"
              required
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="password"
              required
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            {loading ? Loader : <button type="submit">Sign In</button>}
            <Link to="/sign-up">First time? Create an account!</Link>
        </form>
      </RightContainer>
    </PageContainer>
  );
}

const PageContainer = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`

const LeftContainer = styled.div`
  width: 63%;
  height: 100%;
  padding-left: 100px;
  padding-bottom: 100px;
  background-color: #151515;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  
  font-weight: 700;
  color: #fff;

  h1 {
    font-size: 106px;
    font-family: 'Passion One', cursive !important;
  }

  h2 {
    font-size: 43px;
    line-height: 64px;
    font-family: 'Oswald', sans-serif !important;
  }

  @media (max-width: 640px) {
    width: 100%;
    min-height: 175px;
    max-height: 175px;
    padding: 0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

    align-items: center;

    h1 {
      font-size: 71px;
    }

    h2 {
      font-size: 23px;
      line-height: normal;
    }
  }
`

const RightContainer = styled.div`
  width: 37%;
  height: 100%;
  background-color: #333;

  display: flex;
  justify-content: center;
  align-items: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    row-gap: 10px;
  }

  button, input {
    width: 70%;
    height: 65px;
    border: none;
    border-radius: 6px;
    font-size: 27px;
    font-weight: 700;
    font-family: 'Oswald', sans-serif !important;
  }

  input {
    background-color: #fff;
    padding-left: 10px;
    color: #9F9F9F;
  }

  button {
    background-color: #1877F2;
    text-align: center;
    color: #fff;
  }

  a {
    color: #fff;
  }

  @media (max-width: 640px) {
    width: 100%;

    button, input {
      width: 90%;
      height: 55px;
    }
  }
`