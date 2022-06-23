import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";
import config from "../../config/config.json";

import icon from "../../assets/images/share.svg";

export default function Share({ postId, setShareModal }) {
  const API = config.API;
  const header = GetTokenAndHeaders("headers");

  const [shareData, setShareData] = useState({
    shareCount: "firstReq",
  });

  useEffect(() => {
    if (shareData.shareCount === "firstReq") {
      axios
        .get(`${API}/reposts/${postId}`, header)
        .then((res) => {
          setShareData({ shareCount: res.data.reposts });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [shareData.shareCount, header, postId, API]);

  function shareThis() {
    setShareData({
      shareCount: Number(shareData.shareCount) + 1,
    });
    setShareModal(true);
  }

  return (
    <ShareContainer>
      <img src={icon} alt="Share" onClick={() => shareThis()} />
      {shareData.shareCount * 1 === 1 ? (
        <span>{shareData.shareCount} re-post</span>
      ) : (
        <span>{shareData.shareCount} re-posts</span>
      )}
    </ShareContainer>
  );
}

const ShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 10px;
  cursor: pointer;

  img {
    width: 20px;
  }

  span {
    font-size: 11px;
    color: #fff;
  }
`;
