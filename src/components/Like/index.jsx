import styled from "styled-components";
import likeIcon from "../../assets/images/likeIcon.svg";
import superlike from "../../assets/images/superlike.svg";
import UserContext from "../../contexts/userContext";
import { useState, useContext, useEffect } from "react";
import axios from 'axios';
import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";

export default function Like({ postId }) {

    const { userData } = useContext(UserContext);
    const header = GetTokenAndHeaders("headers");
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    const [usersLike, setUsersLike] = useState([]); // preencher array com os usuários que curtiram esse post

    useEffect(() => {

        axios.get(`http://localhost:5000/likes/${postId}`, header).then(res => {
            setLikesCount(res.data.likes);
            console.log(res.data);

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

            setUsersLike(res.data.users);

        }).catch(err => {
            console.log(err);
        });

    }, [postId]);

    function LikeThis(userId, postId) {

        if (!liked) {

            axios.post(`http://localhost:5000/like/${postId}`, { userId }, header)

                .then(res => {

                    setLiked(true);
                    alert("Liked!");

                }).catch(err => console.log(err));

        } else {

            axios.post(`http://localhost:5000/unlike/${postId}`, { userId }, header)

                .then(res => {
                    setLiked(false);
                    alert("Unliked!");
                    setLikesCount(likesCount - 1);
                }).catch(err => console.log(err));
        }

    }

    const usersLikeNames = usersLike.map(user => user.username + "\n");

    return (

        <SuperLike>
            <img src={liked ? superlike : likeIcon} alt="Like" onClick={() => LikeThis(userData.id, postId)} />
            <span>{likesCount}</span>
            <span>{usersLikeNames}</span>
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