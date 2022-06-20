import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import styled from "styled-components";
import axios from 'axios'
import dotenv from "dotenv";

import ValidateThisEmailAndPass from "../../Resources/ValidateEmailAndPass";
import Loader from "../../Resources/Loader";
import GetAvatar from "../../Resources/GetAvatar";

dotenv.config();

export default function LoginPage() {
    const API = process.env.REACT_APP_API
    const navigate = useNavigate();
    const [data, setData] = useState({ name: null, email: null, password: null, confirmPassword: null, avatar: null });
    const [loading, setLoading] = useState(false);

    function HandleSubmit(e) {

        e.preventDefault();
        setLoading(true);

        if (ValidateThisEmailAndPass(data.email, data.password)) {

            if (data.password !== data.confirmPassword) {
                setLoading(false);
                return alert("Passwords do not match");
            }

            const userData = {
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.password,
                avatar: data.avatar ? data.avatar : 'https://i.imgur.com/62ufJYt.jpeg'
            };

            axios.post(API + '/signup', userData)
                .then(res => navigate('/'))
                .catch(err => {
                    alert(`ops !\n\n${err.response.data}`);
                })
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
                    type='text'
                    placeholder='name'
                    required
                    onChange={e => setData({ ...data, name: e.target.value })} />
                <input
                    type='text'
                    placeholder='email'
                    required
                    onChange={e => setData({ ...data, email: e.target.value })} />
                <input
                    type='password'
                    placeholder='password'
                    required
                    onChange={e => setData({ ...data, password: e.target.value })} />
                <input
                    type='password'
                    placeholder='confirm password'
                    required
                    onChange={e => setData({ ...data, confirmPassword: e.target.value })} />
                <label htmlFor="file">{data.avatar ? 'Update Avatar' : 'Choose avatar'}</label>
                <input type="file" id="file" hidden accept=".png, .jpg, .jpeg"
                    onChange={e => GetAvatar(data, setData)} />

                    {loading ? Loader : <button type='submit'>Sign Up</button>}

                    <Link to='/'>Already have an account ? Sign In !</Link>
            </form>
            </RightContainer>
        </PageContainer>
    )
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

  button, input, label {
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

  button, label {
    background-color: #1877F2;
    text-align: center;
    color: #fff;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    color: #fff;
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 30px 0;

    button, input, label {
      width: 90%;
      height: 55px;
    }
  }
`