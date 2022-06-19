import { useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function ResultItem({data}) {
    const navigate = useNavigate();

    function redirectToUser() {
        navigate(`/users/${data.id}`, {state: {username: data.username}});
      }

    return (
        <ResultContainer onClick={() => redirectToUser(data.id)}>
            <img src={data.picture} alt={`${data.username}`}/>
            <span>{data.username}</span>
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