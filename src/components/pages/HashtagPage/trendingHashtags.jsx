import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import dotenv from "dotenv";

import TokenContext from "../../../contexts/tokenContext";

dotenv.config();

export default function TrendingHashtags() {
  const API = process.env.REACT_APP_API;
  const [hashtags, setHashtags] = useState([]);
  const { token } = useContext(TokenContext);
  const navigate = useNavigate();
  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${API}/trending`, config)
      .then((response) => {
        setHashtags(response.data);
      })
      .catch((err) => {
        console.log(err);
        navigate("/");
      });
  }, [navigate, token]);
  return (
    <>
      <TrendContainer>
        <Title>trending</Title>
        <Division />
        {hashtags.map((hashtag) => (
          <HashtagContainer
            key={hashtag.name}
            onClick={() => navigate(`/hashtag/${hashtag.name}`)}
          >
            #{hashtag.name}
          </HashtagContainer>
        ))}
      </TrendContainer>
    </>
  );
}

const TrendContainer = styled.aside`
  width: 301px;
  height: 406px;
  left: 877px;
  top: 232px;

  background: #171717;
  border-radius: 16px;

  @media (max-width: 951px) {
    display: none;
  }
`;

const Title = styled.h1`
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
  line-height: 40px;
  color: #ffffff;
  margin: 9px 0 12px 16px;
`;

const Division = styled.div`
  width: 100%;
  height: 1px;
  background-color: #484848;
  margin-bottom: 22px;
`;

const HashtagContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  margin-bottom: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 19px;
  line-height: 23px;
  letter-spacing: 0.05em;
  color: #ffffff;
  cursor: pointer;
`;
