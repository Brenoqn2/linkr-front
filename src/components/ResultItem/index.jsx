import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/userContext";

export default function ResultItem({data}) {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);

    function redirectToUser() {
        navigate(`/users/${data.id}`, {state: {username: data.username}});
    }

    let username;
    if(userData.followingIds?.some(followingId => followingId == data.id)) {
        username = <span>{data.username} <Title> • following</Title></span>;
    } else {
        username = <span>{data.username}</span>
    }


    return (
        <ResultContainer onClick={() => redirectToUser(data.id)}>
            <img src={data.picture} alt={`${data.username}`}/>
            {username}
        </ResultContainer>
    )
}

const ResultContainer = styled.div`
    width: 100%;
    height: fit-content;
    margin: 5px 0;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    padding-left: 20px;

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }

    span {
        color: #515151;
        font-size: 19px;
    }
`

const Title = styled.span`
  color: #C5C5C5 !important;
`;