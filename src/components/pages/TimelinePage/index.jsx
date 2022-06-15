import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import PostsList from "../../PostsList";
import Header from "../../Header";

export default function TimelinePage() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        axios.get('http://localhost:4000/posts')
        .then(response => {
            setPosts(response.data);
        })
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }, []);

    const postsList = posts ? <PostsList posts={posts}></PostsList> : <NoContent>There are no posts yet</NoContent>;
    
    const loadingElement = <LoadingContainer><ThreeDots width={100} color={'#000'} /></LoadingContainer>
    ;

    return (
        
        <TimelineContainer>
            <Header />
            {loading ? loadingElement : postsList}
        </TimelineContainer>
    )
}

const TimelineContainer = styled.main`
    width: 100%;
    min-height: 100vh;
    background-color: #333333;
    padding-top: 70px;

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