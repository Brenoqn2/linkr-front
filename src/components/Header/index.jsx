import styled from "styled-components"

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useContext } from "react";

import TokenContext from "../../contexts/tokenContext";

import config from "../../config/config.json";
import ChooseAvatar from "../Resources/ChooseAvatar";
import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";

import logo from "../../assets/images/Logo.svg";
import arrow from "../../assets/images/arrow.svg";
import search from "../../assets/images/search.svg";

export default function Header({ profilePic, username }) {

    const navigate = useNavigate();
    const { setToken } = useContext(TokenContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const token = GetTokenAndHeaders("token");

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    function Logout() {

        axios.post(`${config.API}/logout`, {}, { headers: { authorization: `Bearer ${token}` } })
            .then(res => {
                setToken('');
                navigate('/');
                alert('bye bye!');
            }).catch(err => {
                alert('Logout not completed!');
            });
    }

    const menuCSS = isMenuOpen ? 'open' : 'close';

    return (
        <>
            <HeaderContainer>
                <img src={logo} alt="LINKR" id="ff" onClick={() => navigate('/timeline')}/>
                <SearchBar>
                    <input type="text" placeholder="Search for people"/>
                    <button><img src={search} alt="Search" /></button>
                </SearchBar>
                <Container>
                    <img src={arrow} alt="menu" onClick={toggleMenu} className={menuCSS} />
                    <img src={profilePic} alt={`${username} profile`} />
                </Container>
            </HeaderContainer>
            <Menu className={menuCSS}>
                <div className="content">
                    <button><label htmlFor="change_avatar">Choose Avatar</label></button>
                    <input type="file" id="change_avatar" hidden accept=".png, .jpg, .jpeg"
                        onChange={e => ChooseAvatar(e.target.value, token)} />
                    <button onClick={Logout}>Logout</button>
                </div>
            </Menu>
        </>
    )
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
        transition: all .25s ease-in-out;
    }

    img.close {
        transform: rotateZ(180deg);
        transition: all .25s ease-in-out;
    }
`

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
`

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
        transition: all .25s ease-in-out;
    }

    &.close {
        top: -30px;
        transition: all .25s ease-in-out;
    }

    .content {

        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 10px;

        label { cursor: pointer; }

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
`

const SearchBar = styled.div`
    width: 563px;
    height: 43px;
    background-color: #fff;
    border-radius: 8px;
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 2px;

    input {
        padding-left: 5px;
        width: 100%;
        height: 100%;
        font-size: 19px;
        color: #c6c6c6;
        border: none;
        border-radius: 8px;

    }

    button {
        width: 43px;
        height: 100%;
        padding-left: 10px;
        border: none;
        background-color: #EEE;
        border-radius: 0 8px 8px 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }
`