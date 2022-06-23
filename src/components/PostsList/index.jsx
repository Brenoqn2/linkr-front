import styled from "styled-components";

import Post from "../Post/";
// import Repost from "../Repost";

export default function PostsList({ posts }) {
  const content = posts.map((post) => <Post data={post} key={post.id}></Post>);

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
