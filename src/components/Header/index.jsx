import styled from "styled-components"

import logo from "../../assets/images/Logo.svg";
import arrow from "../../assets/images/arrow.svg";

export default function Header() {
    return (
        <HeaderContainer>
                <img src={logo} alt="LINKR" />
            <Container>
                <img src={arrow} alt="menu" />
                <img src="" alt="" />
            </Container>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;
    background-color: #151515;
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
`

const Container = styled.div`
    
`