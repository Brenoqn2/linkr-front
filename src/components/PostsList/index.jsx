import styled from "styled-components";

import Post from "../Post/";

export default function PostsList({posts}) {
    const content = posts.map(post => <Post data={post}></Post>)

    return (
        <Posts>
            {content}
        </Posts>
    )
}

const Posts = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 20px;
`