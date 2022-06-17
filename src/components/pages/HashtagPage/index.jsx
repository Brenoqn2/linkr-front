import styled from "styled-components";
import TrendingHashtags from "./trendingHashtags";

export default function HashtagPage() {
  return (
    <HashtagContainer>
      <Title>#react</Title>
      <div>
        <Feed></Feed>
        <TrendingHashtags />
      </div>
    </HashtagContainer>
  );
}

const HashtagContainer = styled.main`
  width: 100%;
  min-height: 100vh;
  background-color: #333333;

  > div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-top: 45px;
    background-color: blue;
    width: 90%;
    max-width: 940px;
    margin: 0 auto;
    height: 500px;
  }
`;

const Title = styled.h1`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  width: 90%;
  margin: 0 auto;
  max-width: 940px;
`;

const Feed = styled.div`
  width: 45%;
  background-color: red;
  height: 500px;
`;
