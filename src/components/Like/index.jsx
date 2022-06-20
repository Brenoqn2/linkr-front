import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import dotenv from "dotenv";
import axios from "axios";
import ReactTooltip from "react-tooltip";

import UserContext from "../../contexts/userContext";

import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";

import unlike from "../../assets/images/likeIcon.svg";
import liked from "../../assets/images/superlike.svg";

dotenv.config();

export default function Like({ postId }) {
    const API = process.env.REACT_APP_API;
    const { userData } = useContext(UserContext);
    const header = GetTokenAndHeaders("headers");

    const [likesData, setData] = useState({
        postLikesCount: 0,
        postUsersLikes: [{ username: "" }],
        postLiked: false,
    });

    useEffect(() => {

        axios.get(`${API}/likes/${postId}`, header).then(res => {

            //console.log(res.data);
            // res.data vem isso :

            /* 
                {
                    "postId": "113",
                    "likes": "1",
                    "users": [
                        {
                            "userId": 5,
                            "username": "Devinho"
                        }
                    ]
                }
            */

        // faz um map para pegar o username e o userId
        const users = res.data.users.map((user) => {
          return {
            userId: user.userId,
            username: user.username,
          };
        });

        setData({
          postLikesCount: res.data.likes,
          postUsersLikes: users,
          postLiked:
            res.data.users.map((user) => user.userId === userData.id).length >
            0,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId, header, userData.id]);

  function LikeThis(userId, postId) {
    // verificar se o userId já curtiu o post
    const userAlreadyLiked = likesData.postUsersLikes.some(
      (user) => user.userId === userId
    );

    if (userAlreadyLiked) {
      axios
        .post(`${API}/unlike/${postId}`, { userId }, header)
        .then((res) => {
          setData({
            postLikesCount: likesData.postLikesCount - 1,
            postUsersLikes: likesData.postUsersLikes.filter(
              (user) => user.userId !== userId
            ),
            postLiked: false,
          });
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`${API}/like/${postId}`, { userId }, header)
        .then((res) => {
          setData({
            postLikesCount: likesData.postLikesCount + 1,
            postUsersLikes: [
              ...likesData.postUsersLikes,
              { userId, username: userData.username },
            ],
            postLiked: true,
          });
        })
        .catch((err) => console.log(err));
    }
  }

  // pega o nome de todos usuarios que curtiram o post e junta numa string separando por \n

  return (
    <SuperLike>
      <img
        data-tip
        data-for={String(postId)}
        src={likesData.postLiked ? liked : unlike}
        alt="Like"
        onClick={() => LikeThis(userData.id, postId)}
      />
      {likesData.postLikesCount * 1 === 1 ? (
        <span>{likesData.postLikesCount} like</span>
      ) : (
        <span>{likesData.postLikesCount} likes</span>
      )}
      <ReactTooltip
        id={String(postId)}
        place="bottom"
        effect="solid"
        type="light"
        getContent={() => {
          if (likesData.postUsersLikes.length > 2) {
            return `${likesData.postUsersLikes[0].username}, ${
              likesData.postUsersLikes[1].username
            } e outras ${likesData.postLikesCount - 2} pessoas curtiram`;
          } else if (likesData.postUsersLikes.length > 1) {
            return `${likesData.postUsersLikes[0].username} e ${likesData.postUsersLikes[1].username} curtiram`;
          } else if (likesData.postUsersLikes.length === 1) {
            return `${likesData.postUsersLikes[0].username} curtiu`;
          } else {
            return "Ninguém curtiu";
          }
        }}
      />
    </SuperLike>
  );
}

const SuperLike = styled.div`
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
