import styled from "styled-components";

import Post from "../Post/";

export default function PostsList({ posts, updatePosts }) {
  const content = posts.map((post) => (
    <Post data={post} key={post.id} updatePosts={updatePosts}></Post>
  ));

  return <Posts>{content}</Posts>;
}

const Posts = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
