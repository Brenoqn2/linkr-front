import styled from "styled-components";

import Post from "../Post/";

export default function PostsList({ posts }) {
  console.log(posts);
  const content = posts.map((post) => <Post data={post} key={post.id}></Post>);

  return <Posts>{content}</Posts>;
}

const Posts = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
