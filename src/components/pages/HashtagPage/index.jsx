import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import dotenv from "dotenv";

import UserContext from "../../../contexts/userContext";
import TokenContext from "../../../contexts/tokenContext";
import PostsContext from "../../../contexts/postsContext";

import TrendingHashtags from "./trendingHashtags";
import PostsList from "../../PostsList";
import Header from "../../Header";

import GetTokenAndHeaders from "../../Resources/GetTokenAndHeaders";

dotenv.config();

export default function HashtagPage() {
  const API = process.env.REACT_APP_API;
  const navigate = useNavigate();
  const { posts, setPosts } = useContext(PostsContext);
  const [loading, setLoading] = useState(true);

  const { userData, setUserData } = useContext(UserContext);
  const { setToken } = useContext(TokenContext);
  const { hashtag } = useParams();
  const header = GetTokenAndHeaders("headers");

  function getUserData() {
    axios
      .get(`${API}/user`, header)
      .then((response) => {
        setUserData({ ...response.data });
        getPosts();
      })
      .catch((err) => {
        console.log(err);
        alert("Session expired, log in to continue");
        setToken("");
        navigate("/");
      });
  }

  function getPosts() {
    axios
      .get(`${API}/hashtag/${hashtag.toLowerCase()}`, header)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    getUserData();
  }, [hashtag]);

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
    <HashtagPageContainer>
      <Header profilePic={userData?.picture} username={userData?.username} />

      <Main>
        <h1>{`# ${hashtag}`}</h1>
        <Content>
          <PostsContent>{loading ? loadingElement : postsList}</PostsContent>
          <TrendingHashtags />
        </Content>
      </Main>
    </HashtagPageContainer>
  );
}

const HashtagPageContainer = styled.main`
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
