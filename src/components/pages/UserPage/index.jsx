import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

import UserContext from "../../../contexts/userContext";
import PostsContext from "../../../contexts/postsContext";

import PostsList from "../../PostsList";
import Header from "../../Header";

import config from "../../../config/config.json";
import GetTokenAndHeaders from "../../Resources/GetTokenAndHeaders";
import Loader from "../../Resources/LoaderFollowBtn";

export default function UserPage() {

  const { id } = useParams();
  const API = config.API;

  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const { posts, setPosts } = useContext(PostsContext);
  const { userData, setUserData } = useContext(UserContext);
  const [followers, setFollowers] = useState([]);
  const [able, setAble] = useState(false);

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
        localStorage.removeItem("token");
        navigate("/");
      });
  }

  function getPosts() {
    setLoading(true);
    axios
      .get(`${API}/users/${id}`, header)
      .then((response) => {
        setPosts(response.data);

      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    setLoading(true);
    getUserData();
    getFollowers();
  }, [id]);

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

  const isUser = id == userData.id; // ( não mudar a comparação pois são tipos diferentes )
  let isFollow = followers.includes(userData.id);
  const options = isUser ? 'My Followers' : isFollow ? 'Unfollow' : 'Follow';

  function getFollowers() {

    axios.get(`${config.API_LOCAL}/followers/${id}`, header).then(res => {
      const followersList = res.data.map(follower => follower.followerId);
      setFollowers(followersList);
      setAble(true);
    })
  }

  // userId é o id do usuário
  function ListFollow(userId) {
    alert(userId);
  }

  function Follow(followerId) {

    // followerId = quem está seguindo
    // followingId = quem está sendo seguido
    setAble(false);

    if (isFollow) {
      axios.post(`${config.API_LOCAL}/unfollow/${followerId}`,
        { userId: userData.id }, header).then(res => {
          getFollowers();
        })

    } else {
      axios.post(`${config.API_LOCAL}/follow/${followerId}`,
        { userId: userData.id }, header).then(res => {
          getFollowers();
        })
    }
  }

  return (
    <UserPageContainer>
      <Header profilePic={userData?.picture} username={userData?.username} />

      <Main>
        <div className="follow-btn">
          <h1>{`${location.state?.username || userData?.username}'s posts`}</h1>
          <button onClick={() => isUser ? ListFollow(userData.id) : Follow(id)} >{able ? options : Loader}</button>
        </div>
        <Content>
          <PostsContent>{loading ? loadingElement : postsList}</PostsContent>
          <TrendingsContent></TrendingsContent>
        </Content>
      </Main>
    </UserPageContainer>
  );
}

const UserPageContainer = styled.main`
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

  .follow-btn {
    width: 100%;
    height: 50px;
    display: flex;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1%;
      width: 90px;
      height: 35px;
      padding: 10px 0;
      background: #1877f2;
      border-radius: 5px;
      border: none;
      font-weight: 700;
      font-size: 13px;
      line-height: 16px;
      text-align: center;
      color: #ffffff;
      cursor: pointer;
    }
  }

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

const TrendingsContent = styled.div`
  width: 301px;
  height: 406px;
  background-color: #171717;
  border-radius: 16px;
  @media (max-width: 951px) {
    display: none;
  }
`;
