import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import TokenContext from "../../../contexts/tokenContext";
import UserContext from "../../../contexts/userContext";

import PostsList from "../../PostsList";
import Header from "../../Header";

export default function TimelinePage() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(TokenContext);
    const { userData, setUserData } = useContext(UserContext);
    

    useEffect(() => {

        const config = {
            headers: {
                authorization: `Bearer ${token}`
            }
        }

        axios.get('http://localhost:4000/user', config)
        .then(response => {
            console.log(response);
            setUserData({...response.data});
        })

        axios.get('http://localhost:4000/posts', config)
        .then(response => {
            setPosts(response.data);
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
        
    }, []);

    const postsList = posts ? <PostsList posts={posts}></PostsList> : <NoContent>There are no posts yet</NoContent>;
    
    const loadingElement = <LoadingContainer><ThreeDots width={100} color={'#fff'} /></LoadingContainer>
    ;

    return (
        <TimelineContainer>
            <Header profilePic={userData?.picture} username={userData?.username}/>
            
            <Main>
                <h1>timeline</h1>
                <Content>
                    <PostsContent>
                        <CreatePost>APENAS UM PLACEHOLDER, SUBSTITUIR PELO COMPONENTE FUNCIONAL</CreatePost> 
                        
                        {loading ? loadingElement : postsList}
                    </PostsContent>
                    <TrendingsContent>
                    </TrendingsContent>
                </Content>
            </Main>
            
        </TimelineContainer>
    )
}

const TimelineContainer = styled.main`
    width: 100%;
    min-height: 100vh;
    background-color: #333333;
    padding-top: 70px;
    margin-top: 30px;

    h1 {
        display: inline-block;
        width: 100%;

        font-family: 'Oswald', sans-serif !important;
        font-size: 43px;    
        font-weight: 700;
        color: #fff;
    }
`

const LoadingContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const NoContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
`

const Main = styled.div`
    max-width: fit-content;
    margin: 0 auto;
    display: flex;
    gap: 50px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 30px;
`

const PostsContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    min-width: 611px;
`

const TrendingsContent = styled.div`
    width: 301px;
    height: 406px;
    background-color: #171717;
    border-radius: 16px;
`

const CreatePost = styled.div`
    width: 611px;
    height: 209px;
    margin-bottom: 30px;
    background-color: #fff;
    border-radius: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`