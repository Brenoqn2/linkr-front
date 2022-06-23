import styled from "styled-components";

import Post from "../Post/";
import Repost from "../Repost";

export default function PostsList({ posts }) {
  const content = posts.map((post) => {
    if (post.postId === 0) return <Post data={post} key={post.id}></Post>;
    else return <Repost data={post} key={post.id}></Repost>;
  });

  return <Posts>{content}</Posts>;
}

const Posts = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

// const Reposts = styled.ul`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
// `;
