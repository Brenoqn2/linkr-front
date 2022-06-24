import axios from "axios";
import { useEffect, useState, useContext, useCallback } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import refreshIcon from "../../../assets/images/refreshIcon.png";

import UserContext from "../../../contexts/userContext";
import PostsContext from "../../../contexts/postsContext";

import PostsList from "../../PostsList";
import Header from "../../Header";
import CreatePost from "../../CreatePost";
import TrendingHashtags from "../HashtagPage/trendingHashtags";

import GetTokenAndHeaders from "../../Resources/GetTokenAndHeaders";
import config from "../../../config/config.json";

export default function TimelinePage() {
  const API = config.API_LOCAL;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loadingNewPosts, setLoadingNewPosts] = useState(false);
  const [hasNewPosts, setHasNewPosts] = useState(false);
  const [newPosts, setNewPosts] = useState(0);
  const { posts, setPosts } = useContext(PostsContext);
  const { userData } = useContext(UserContext);
  const header = GetTokenAndHeaders("headers");
  let interval;
  const getPosts = useCallback(
    () => {
      setLoading(true);
      axios
        .get(`${API}/posts`, header)
        .then((response) => {
          clearInterval(interval);
          setHasNewPosts(false);
          setPosts(response.data);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          interval = setInterval(
            () => getNotifications(response.data[0].id),
            15000
          );
          checkPosts();
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    },
    //eslint-disable-next-line
    [API, setPosts]
  );

  function getNotifications(lastPost) {
    axios
      .get(`${API}/checkNewPosts/${lastPost}`, header)
      .then((response) => {
        console.log("NOTIFICATIONS", response.data, lastPost);
        if (response.data.newPosts > 0) {
          setNewPosts(response.data.newPosts);
          setHasNewPosts(true);
        }
      })
      .catch((err) => console.log(err));
  }

  function getMorePosts(page) {
    setLoadingNewPosts(true);
    axios
      .get(`${API}/posts?page=${page + 1}`, header)
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
      .get(`${API}/checkPosts?page=${page + 1}`, header)
      .then((response) => {
        setHasNextPage(response.data);
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  // function getReposts() {
  //   setLoading(true);
  //   axios
  //     .get(`http://localhost:5000/reposts/${postId}`, header)
  //     .then((res) => {
  //       setShareData({ shareCount: res.data.reposts });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const postsList = posts?.length ? (
    <InfiniteScroll
      data-testid="episodes-infinite-scroll"
      pageStart={0}
      loadMore={getMorePosts}
      hasMore={hasNextPage && !loadingNewPosts}
      loader={<ThreeDots width={30} height={10} color={"#fff"} />}
    >
      <PostsList posts={posts}></PostsList>
    </InfiniteScroll>
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
            {hasNewPosts ? (
              <NewPosts onClick={() => getPosts()}>
                <p>
                  {newPosts} new posts, load more!{" "}
                  <img src={refreshIcon} alt="refresh" />
                </p>
              </NewPosts>
            ) : (
              <></>
            )}
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
  margin-bottom: 30px;
`;

const PostsContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`;

const NewPosts = styled.div`
  width: 611px;
  max-width: 80%;
  height: 61px;
  background: #1877f2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  margin: 0 auto;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;

    color: #ffffff;
    img {
      width: 22px;
      height: 16px;
      margin-left: 14px;
    }
  }
`;
