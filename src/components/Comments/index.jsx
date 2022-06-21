import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components"

import UserContext from "../../contexts/userContext";

import planeIcon from "../../assets/images/plane.svg";

import config from "../../config/config.json";

export default function Comments({comments}) {

    return (
        <CommentsSection>
            <InputComment />
        </CommentsSection>
    )
}

function InputComment() {
    const { userData } = useContext(UserContext);

    return (
        <CreateComment>
            <img src={userData.picture} alt={userData.username} />
            <div>
                <input type="text" placeholder="write a comment..."/>
                <button>
                    <img src={planeIcon} alt="Send" />
                </button>
            </div>
        </CreateComment>
    )
}

const CommentsSection = styled.section`
    width: 95%;
    height: 200px;
    padding-left: 20px;
    background-color: red;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
`

const CreateComment = styled.div`
    width: 100%;
    height: 83px;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 20px;

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }
    
    div {
        width: 90%;
        height: 39px;
        border-radius: 8px;

        display: flex;
        justify-content: space-between;
        align-items: center;

        
        input {
            width: 100%;
            height: 100%;
            border-radius: 8px 0 0 8px;
            border: none;
            background-color: #252525;

            font-size: 14px;
            color: #575757;
            padding-left: 10px;
        }

        button {
            height: 100%;
            width: 39px;
            background-color: #252525;
            border: none;
            border-radius: 0 8px 8px 0;
        }

        img {
            width: 14px;
        }
    }
`