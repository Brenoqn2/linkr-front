import axios from "axios";
import { useEffect, useState, useContext } from "react";
import styled from "styled-components"

import UserContext from "../../contexts/userContext";

import planeIcon from "../../assets/images/plane.svg";

import config from "../../config/config.json";
import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";

export default function Comments({comments, setComments, postId}) {

    const commentsComponents = comments?.map(comment => <Comment data={comment}/>)

    return (
        <CommentsSection>
            {commentsComponents}    
            <InputComment comments={comments} setComments={setComments} postId={postId} />
        </CommentsSection>
    )
}

function InputComment({comments, setComments, postId}) {
    const API = config.API;
    const header = GetTokenAndHeaders('headers');
    const { userData } = useContext(UserContext);
    const [ newComment, setNewComment ] = useState('');
    const [ loading, setLoading ] = useState(false);

    function addComment() {
        setLoading(true);
        axios.post(`${API}/post/${postId}/comments`, {
            postId,
            userId: userData.id,
            content: newComment
        }, header)
        .then(response => {
            alert('COMENTARIO ADICIONADO COM SUCESSO');
            setComments([...comments, response.data])
        })
        .catch(err => {
            console.log(err);
            alert('Error while trying to add comment');
        })
        .finally(() => setLoading(false))
    }

    const disabledCSS = loading ? 'disabled' : undefined;

    return (
        <CreateComment>
            <img src={userData.picture} alt={userData.username} />
            <form onSubmit={addComment}>
                <input 
                type="text" 
                placeholder="write a comment..."
                className={disabledCSS} 
                value={newComment}
                disabled={loading}
                onChange={e => {
                    setNewComment(e.target.value);
                }}/>
                <button type="submit" className={disabledCSS}>
                    <img src={planeIcon} alt="Send" />
                </button>
            </form>
            
        </CreateComment>
    )
}

function Comment({data}) {
    return (
        <CommentContainer>
            <img src={data.picture} alt={data.username}/> 
            <div>
                <div>
                    <span>{data.username}</span>
                </div>
                <p>
                    {data.content}
                </p>
            </div>       
        </CommentContainer>
    )
}

const CommentsSection = styled.section`
    width: 95%;
    height: fit-content;
    padding-top: 20px;
    padding-left: 20px;
    background-color: #1E1E1E;
    border-radius: 0 0 16px 16px;
    
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 15px;
`

const CreateComment = styled.div`
    width: 100%;
    height: 83px;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 20px;

    .disabled {
        opacity: .5;
    }

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }
    
    form {
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
            outline: none;

            color: #fff;
            font-size: 14px;
            padding-left: 10px;
        }
        
        input::placeholder {
            color: #575757;
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

const CommentContainer = styled.ul`
    width: 100%;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: 20px;
    padding-bottom: 20px;

    position: relative;

    &::after {
        content: '';
        width: calc(90% + 59px);
        height: 1px;
        background-color: #353535;
        position: absolute;
        bottom: 0;
    }

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }

    & > div {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        row-gap: 5px;
    }

    span, p {
        font-size: 14px;
    }

    span {
        color: #fff;
    }

    p {
        color: #ACACAC;
    }
`
