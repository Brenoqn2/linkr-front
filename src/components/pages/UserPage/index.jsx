import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";

import UserContext from "../../../contexts/userContext";

import PostsList from "../../PostsList";
import Header from "../../Header";
import TrendingHashtags from "../HashtagPage/trendingHashtags";

import config from "../../../config/config.json";
import GetTokenAndHeaders from "../../Resources/GetTokenAndHeaders";
import Loader from "../../Resources/LoaderFollowBtn";

export default function UserPage() {
  const { id } = useParams();
  const API = config.API;

  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const { userData, setUserData } = useContext(UserContext);
  const [followers, setFollowers] = useState([]);
  const [able, setAble] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loadingNewPosts, setLoadingNewPosts] = useState(false);
  const [page, setPage] = useState(1);

  const header = GetTokenAndHeaders("headers");

  function getMorePosts(page) {
    console.log("PAGINA", page);
    setLoadingNewPosts(true);
    axios
      .get(`${API}/users/${id}?page=${page + 1}`, header)
      .then((response) => {
        console.log("aqui", response.data);
        setPosts([...posts, ...response.data]);
        setPage(page + 1);
        checkPosts();
        setLoadingNewPosts(false);
      })
      .catch((err) => console.log(err));
  }

  function checkPosts() {
    axios
      .get(`${API}/users/checkPosts/${id}?page=${page + 2}`, header)
      .then((response) => {
        setHasNextPage(response.data);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  const getFollowers = useCallback(() => {
    axios.get(`${API}/followers/${id}`, header).then((res) => {
      const followersList = res.data.map((follower) => follower.followerId);
      setFollowers(followersList);
      setAble(true);
    });
  }, [API, header, id]);

  const getPosts = useCallback(() => {
    setLoading(true);
    axios
      .get(`${API}/users/${id}`, header)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [API, id, header, setPosts]);

  useEffect(() => {
    console.log("useeffect do userpage");
    if (posts === null) {
      console.log("to aqui ");
      setLoading(true);
      getFollowers();
    }
    getPosts();
  }, [id]);

  const loadingElement = (
    <LoadingContainer>
      <span>Loading </span>
      <ThreeDots width={30} height={10} color={"#fff"} />
    </LoadingContainer>
  );

  const postsList = posts?.length ? (
    <InfiniteScroll
      className="infiniteScroll"
      data-testid="episodes-infinite-scroll"
      pageStart={0}
      loadMore={getMorePosts}
      hasMore={hasNextPage && !loadingNewPosts}
      loader={loadingElement}
    >
      <PostsList posts={posts}></PostsList>
    </InfiniteScroll>
  ) : (
    <NoContent>There are no posts yet</NoContent>
  );

  const isUser = Number(id) === Number(userData.id);
  let isFollow = userData.followingIds.includes(Number(id));
  const options = isUser ? "My Followers" : isFollow ? "Unfollow" : "Follow";

  // userId é o id do usuário
  function ListFollow(userId) {
    const list = followers.join(",");

    alert(`you id: ${userId}\n\n
    your followers id's: ${list}`);
  }

  function Follow(followerId) {
    // followerId = quem está seguindo
    // followingId = quem está sendo seguido
    setAble(false);

    if (isFollow) {
      axios
        .post(`${API}/unfollow/${followerId}`, { userId: userData.id }, header)
        .then((res) => {
          getFollowers();
          setAble(true);
          setUserData({...userData, followingIds: userData.followingIds.filter(id => id !== Number(followerId))});
        })
        .catch((err) => {
          console.log(err);
          setAble(true);
        });
    } else {
      axios
        .post(`${API}/follow/${followerId}`, { userId: userData.id }, header)
        .then((res) => {
          getFollowers();
          setAble(true);
          setUserData({...userData, followingIds: [...userData.followingIds, Number(followerId)]});
        })
        .catch((err) => {
          console.log(err);
          setAble(true);
        });
    }
  }

  return (
    <UserPageContainer>
      <Header profilePic={userData?.picture} username={userData?.username} />

      <Main>
        <div className="follow-btn">
          <h1>{`${location.state?.username || userData?.username}'s posts`}</h1>
          <button
            className={isFollow  ? 'unfollow' : undefined}
            onClick={() => (isUser ? ListFollow(userData.id) : Follow(id))}
          >
            {able ? options : Loader}
          </button>
        </div>
        <Content>
          <PostsContent>{loading ? loadingElement : postsList}</PostsContent>
          <TrendingHashtags></TrendingHashtags>
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
      transition: all .5 ease-in;
    }

    .unfollow {
      background-color: #fff;
      color: #1877f2;
      transition: all .5 ease-in;
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
