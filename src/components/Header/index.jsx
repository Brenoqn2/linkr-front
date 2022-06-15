import styled from "styled-components"

import { useState } from "react";

import logo from "../../assets/images/Logo.svg";
import arrow from "../../assets/images/arrow.svg";

export default function Header({profilePic, username}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }


    const menuCSS = isMenuOpen ? 'open' : 'close';

    return (
        <>    
            <HeaderContainer>
                <img src={logo} alt="LINKR" />
                <Container>
                    <img src={arrow} alt="menu" onClick={toggleMenu} className={menuCSS}/>
                    <img src={profilePic} alt={`${username} profile`} />
                </Container>
            </HeaderContainer>
            <Menu className={menuCSS}>Logout</Menu>
        </>
    )
}

const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;
    padding: 0 20px;
    background-color: #151515;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
    z-index: 2;

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
    }

    img:last-child {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
`

const Menu = styled.div`
    height: 50px;
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
        top: 70px;
        transition: all .25s ease-in-out;
    }

    &.close {
        top: 0;
        transition: all .25s ease-in-out;
    }
`