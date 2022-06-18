import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';

import config from "../../config/config.json";
import unlike from "../../assets/images/likeIcon.svg";
import liked from "../../assets/images/superlike.svg";
import UserContext from "../../contexts/userContext";
import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";

export default function Like({ postId }) {

    const { userData } = useContext(UserContext);
    const header = GetTokenAndHeaders("headers");

    const [likesData, setData] = useState({

        postLikesCount: 0,
        postUsersLikes: [],
        postLiked: false,
    });

    useEffect(() => {

        axios.get(`${config.API}/likes/${postId}`, header).then(res => {

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
            const users = res.data.users.map(user => {
                return {
                    userId: user.userId,
                    username: user.username
                }
            });

            setData({
                postLikesCount: res.data.likes,
                postUsersLikes: users,
                postLiked: res.data.users.map(user => user.userId === userData.id).length > 0
            });

        }).catch(err => {
            console.log(err);
        });

    }, [postId]);

    function LikeThis(userId, postId) {

        // verificar se o userId já curtiu o post
        const userAlreadyLiked = likesData.postUsersLikes.some(user => user.userId === userId);

        if (userAlreadyLiked) {

            axios.post(`${config.API}/unlike/${postId}`, { userId }, header)
                .then(res => {
                    alert("Unliked!");
                    setData({
                        postLikesCount: likesData.postLikesCount - 1,
                        postUsersLikes: likesData.postUsersLikes.filter(user => user.userId !== userId),
                        postLiked: false,
                    });
                }).catch(err => console.log(err));

        } else {

            axios.post(`${config.API}/like/${postId}`, { userId }, header)
                .then(res => {
                    setData({
                        postLikesCount: likesData.postLikesCount + 1,
                        postUsersLikes: [...likesData.postUsersLikes, { userId, username: userData.username }],
                        postLiked: true,
                    });
                    alert("Liked!");
                }).catch(err => console.log(err));
        }
    }

    // pega o nome de todos usuarios que curtiram o post e junta numa string separando por \n
    const usersLikes = likesData.postUsersLikes.map(user => user.username).join("\n");

    return (
        <SuperLike>
            <img src={likesData.postLiked ? liked : unlike} alt="Like" onClick={() => LikeThis(userData.id, postId)} />
            <span>{likesData.likesCount}</span>
            <span>{usersLikes}</span>
        </SuperLike>
    )
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