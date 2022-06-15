import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

import PostsList from "../../PostsList";

export default function TimelinePage() {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:4000/posts')
        .then(response => {
            setPosts(response.data);
        })
        .catch(err => console.log(err));
    }, []);

    const postsList = posts ? <PostsList posts={posts}></PostsList> : undefined;

    return (
        <TimelineContainer>
            {postsList}
        </TimelineContainer>
    )
}

const TimelineContainer = styled.main`
    width: 100%;
    min-height: 100vh;
`