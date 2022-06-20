import axios from "axios";
import styled from "styled-components";
import { useState, useContext } from "react";
import dotenv from "dotenv";

import PostsContext from "../../contexts/postsContext";

import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";

dotenv.config();

export default function DeleteModal({setIsActive, id}) {
    const API = process.env.REACT_APP_API;
    const header = GetTokenAndHeaders("headers");
    const [ loading, setLoading ] = useState(false);
    const { posts, setPosts } = useContext(PostsContext);

    function confirmDelete() {
        setLoading(true);
        axios.delete(`${API}/post/${id}`, header)
        .then(() => {
            setPosts(posts.filter(post => post.id !== id));
        })
        .catch(err => {
            console.log(err);
            alert('Nao foi possivel deletar o post');
        })
        .finally(() => {
            setLoading(false);
            setIsActive(false);
        })
    }

    function cancelDelete() {
        setIsActive(false);
    }


    return (
        <Modal>
            <Alert>
                <Container>
                    Are you sure you want
                    to delete this post?
                </Container>
                <Container>
                    <button onClick={cancelDelete} disabled={loading}>
                        No, go back
                    </button>
                    <button onClick={confirmDelete} disabled={loading}>    
                        {loading ? 'Deleting...' : 'Yes, delete it'}
                    </button>
                </Container>
            </Alert>
        </Modal>
    )
}

const Modal = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgba(255, 255, 255, 0.9);

    display: flex;
    justify-content: center;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
`

const Alert = styled.div`
    width: 597px;
    height: 267px;
    background-color: #333;
    border-radius: 50px;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
`

const Container = styled.div`

    &:first-child {
        font-size: 34px;
        font-weight: 700;
        color: #fff;
        text-align: center;
        width: 350px;
    }

    &:last-child {
        display: flex;
        justify-content: space-between;
        align-items: center;
        column-gap: 20px;
    }

    button {
        width: 134px;
        height: 37px;
        border-radius: 5px;
        border: none;
        
        font-size: 18px;
        font-weight: 700;
    }

    button:first-child {
        background-color: #fff;
        color:#1877F2;
    }

    button:last-child {
        background-color: #1877F2;
        color: #fff;
    }
`