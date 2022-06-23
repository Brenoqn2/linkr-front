import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import UserContext from "../../../contexts/userContext";
import PostsContext from "../../../contexts/postsContext";

import PostsList from "../../PostsList";
import Header from "../../Header";
import CreatePost from "../../CreatePost";
import TrendingHashtags from "../HashtagPage/trendingHashtags";

import GetTokenAndHeaders from "../../Resources/GetTokenAndHeaders";
import config from "../../../config/config.json";

export default function TimelinePage() {
  const API = config.API;
  const [loading, setLoading] = useState(true);
  const { posts, setPosts } = useContext(PostsContext);
  const { userData } = useContext(UserContext);
  const header = GetTokenAndHeaders("headers");
  const getPosts = useCallback(
    (page = 0) => {
      setLoading(true);
      axios
        .get(`${API}/posts?pages=${page}`, header)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    },
    //eslint-disable-next-line
    [API, setPosts]
  );

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const postsList = posts?.length ? (
    <PostsList posts={posts}></PostsList>
  ) : (
    <NoContent>There are no posts yet</NoContent>
  );

  const loadingElement = (
    <LoadingContainer>
      <span>Loading </span>
      <ThreeDots width={30} height={10} color={"#fff"} />
    </LoadingContainer>
  );

  return (
    <TimelineContainer>
      <Header profilePic={userData?.picture} username={userData?.username} />

      <Main>
        <h1>timeline</h1>
        <Content>
          <PostsContent>
            <CreatePost updatePosts={getPosts} />
            {loading ? loadingElement : postsList}
          </PostsContent>
          <TrendingHashtags />
        </Content>
      </Main>
    </TimelineContainer>
  );
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
    font-size: 43px;
    font-weight: 700;
    color: #fff;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  column-gap: 10px;
  width: 100px;
  height: 40px;
  margin: 0 auto;

  span {
    font-size: 30px;
    font-weight: bold;
    opacity: 0.8;
    color: #fff;
  }

  svg {
    margin-bottom: 1px;
  }

  span,
  svg {
    animation-name: pulse;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    animation-delay: 0s;
    animation-direction: forwards;
    animation-play-state: running;
  }

  @keyframes pulse {
    0% {
      color: #fff;
      fill: #fff;
    }

    50% {
      color: #929191;
      fill: #929191;
    }

    100% {
      color: #fff;
      fill: #fff;
    }
  }
`;

const NoContent = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 20px;
`;

const Main = styled.div`
  width: 90%;
  margin: 0 auto;
  display: flex;
  gap: 50px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 640px) {
    width: 100%;

    h1 {
      padding-left: 20px;
    }
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 30px;
`;

const PostsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;
