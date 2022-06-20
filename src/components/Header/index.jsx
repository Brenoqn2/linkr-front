import styled from "styled-components"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import { DebounceInput } from "react-debounce-input";
import dotenv from "dotenv";

import ResultItem from "../ResultItem";

import TokenContext from "../../contexts/tokenContext";

import ChooseAvatar from "../Resources/ChooseAvatar";
import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";

import logo from "../../assets/images/Logo.svg";
import arrow from "../../assets/images/arrow.svg";
import search from "../../assets/images/search.svg";

dotenv.config();

export default function Header({ profilePic, username }) {
    const API = process.env.REACT_APP_API;
    const navigate = useNavigate();
    const { setToken } = useContext(TokenContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [ searchInput, setSearchInput ] = useState(null);
    const [searchResult, setSearchResult ] = useState([]);
    const token = GetTokenAndHeaders("token");
    const header = GetTokenAndHeaders("headers");

    function getSearchResult() {
        axios.get(`${API}/users?name=${searchInput}`, header)
        .then(response => setSearchResult(response.data))
        .catch(err => console.log(err));
    }

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function Logout() {
        axios.post(`${API}/logout`, {}, header)
            .then(res => {
                setToken('');
                navigate('/');
                alert('bye bye!');
            }).catch(err => {
                alert('Logout not completed!');
            });
    }

  useEffect(() => {
    if (!searchInput) return;
    getSearchResult();
  }, [searchInput]);

  const result = searchResult.map((user) => (
    <ResultItem data={user} key={user.id}></ResultItem>
  ));

  const searchBarCSS = searchResult?.length ? "open" : "close";
  const menuCSS = isMenuOpen ? "open" : "close";

  return (
    <>
      <HeaderContainer>
        <img
          src={logo}
          alt="LINKR"
          id="ff"
          onClick={() => navigate("/timeline")}
        />
        <SearchBar className={searchBarCSS}>
          <DebounceInput
            minLength={3}
            debounceTimeout={300}
            placeholder="Search for people"
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <button>
            <img src={search} alt="Search" />
          </button>
          <SearchResult>{result}</SearchResult>
        </SearchBar>
        <Container>
          <img
            src={arrow}
            alt="menu"
            onClick={toggleMenu}
            className={menuCSS}
          />
          <img src={profilePic} alt={`${username} profile`} />
        </Container>
      </HeaderContainer>
      <Menu className={menuCSS}>
        <div className="content">
          <button>
            <label htmlFor="change_avatar">Choose Avatar</label>
          </button>
          <input
            type="file"
            id="change_avatar"
            hidden
            accept=".png, .jpg, .jpeg"
            onChange={(e) => ChooseAvatar(e.target.value, token)}
          />
          <button onClick={Logout}>Logout</button>
        </div>
      </Menu>
    </>
  );
}

const HeaderContainer = styled.header`
  width: 100%;
  height: 75px;
  padding: 0 20px;
  background-color: #151515;

  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  z-index: 2;
  #ff {
    cursor: pointer;
  }

  img.open {
    transition: all 0.25s ease-in-out;
  }

  img.close {
    transform: rotateZ(180deg);
    transition: all 0.25s ease-in-out;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  column-gap: 20px;

  img:first-child {
    width: 18px;
    cursor: pointer;
  }

  img:last-child {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;

const Menu = styled.div`
  height: 100px;
  width: 150px;
  border-radius: 0px 0px 0px 20px;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  right: 0;
  z-index: 1 !important;

  background-color: #171717;

  font-size: 20px;
  font-weight: 500;

  &.open {
    top: 75px;
    transition: all 0.25s ease-in-out;
  }

  &.close {
    top: -30px;
    transition: all 0.25s ease-in-out;
  }

  .content {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;

    label {
      cursor: pointer;
    }

    button {
      margin-top: 1%;
      width: 90px;
      height: 35px;
      padding: 10px 0;

      background: #1877f2;
      border-radius: 5px;
      border: none;

      font-weight: 700;
      font-size: 13px;
      line-height: 16px;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
    }
  }
`;

const SearchBar = styled.div`
  width: 50%;
  height: 43px;
  background-color: #fff;
  border-radius: 8px;
  border: none;

  display: flex;
  justify-content: space-between;
  align-items: center;
  column-gap: 2px;

  position: relative;

  &.open {
    border-radius: 8px 8px 0 0;
  }

  input {
    padding-left: 5px;
    width: 100%;
    height: 100%;
    font-size: 19px;
    color: #c6c6c6;
    border: none;
    border-radius: 8px 0 0 8px;
  }

  button {
    width: 43px;
    height: 100%;
    padding-left: 10px;
    border: none;
    border-radius: 0 8px 8px 0;
    background-color: #fff;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

const SearchResult = styled.div`
  position: absolute;
  z-index: 3;
  bottom: 0 !important;
  top: 100% !important;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  width: 100%;
  height: fit-content;
  border-radius: 0 0 8px 8px;
  background-color: #e7e7e7;
`;
