import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactHashtag from "@mdnm/react-hashtag";
import styled from "styled-components";

import defaultImage from "../../assets/images/defaultImage.jpg";
import likeIcon from "../../assets/images/likeIcon.svg";

export default function Post({data}) {
    const [metadata, setMetadata] = useState(null);
    const navigate = useNavigate();
    console.log(data.content);

    // busca os metadados do link
    useEffect(() => {
        axios.get(`http://localhost:4000/posts/${data.id}/metadata`)
        .then(response => {
            setMetadata(response.data);
        })
        .catch(err => console.log(err))
    }, []);

    function addDefaultImg(e) {
        e.target.src = defaultImage;
    }

    function redirectToUser() {
        navigate(`/users/${data.userId}`);
    }

    return (
        <PostItem>
            <Container>
                <UserPicture onClick={redirectToUser} url={data.picture}/>
                <Like>
                    <img src={likeIcon} alt="Like" />
                    <span>10 likes</span>
                </Like>
            </Container>
            
            <Container>
                <UserName onClick={() => navigate(`users/${data.userId}`)}>
                    {data.username}
                </UserName>
                
                <Desc>
                    <ReactHashtag
                        renderHashtag={val => <Hashtag onClick={() => navigate(`/hashtag/${val.replace('#', '')}`)}>{val}</Hashtag>}
                    >
                        {data.content}
                    </ReactHashtag>
                </Desc>
                <LinkSnippet onClick={() => window.open(data.link, '_blank')}>
                    <div>
                        <h2>
                            {metadata?.title}
                        </h2>
                        <p>
                            {metadata?.description}
                        </p>
                        <span>
                            {metadata?.url}
                        </span>
                    </div>
                    <img onError={addDefaultImg} src={metadata?.image} alt={metadata?.title}/>
                </LinkSnippet>
            </Container>

        </PostItem>
    )
}

const PostItem = styled.li`
    width: 611px;
    height: 276px;
    padding: 20px 20px 20px 20px;

    display: flex;
    column-gap: 20px;
    justify-content: space-between;

    background-color: #171717;
    border-radius: 16px;
    position: relative;
`

const Container = styled.div`
    min-height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    &:first-child {
        row-gap: 20px;
    }

    &:last-child {
        align-items: flex-start;
        justify-content: space-between;
    }
`

const Hashtag = styled.p`
    display: inline;
    color: #fff;
`

const UserName = styled.h2`
    font-size: 19px;
    color: #fff;
`

const UserPicture = styled.div`
    width: 50px;
    height: 50px;

    border-radius: 50%;
    background-image:  url(${(props) => props.url ? props.url : defaultImage});
    background-size: contain;

`

const Desc = styled.p`
    font-size: 17px;
    color: #b7b7b7;
`

const LinkSnippet = styled.div`
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;

    display: flex;
    justify-content: space-between;

    img {
        width: 154px;
        height: 155px;
        border-radius: 0 11px 11px 0;
        
        background-color: #CECECE;
        
        text-align: center;
    }

    div {
        padding-left: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        row-gap: 10px;
        align-items: flex-start;

        h2 {
            font-size: 16px;
            color: #CECECE;
        }

        p {
            font-size: 11px;
            color:#9B9595;
        }

        span {
            font-size: 11px;
            color: #CECECE;
        }

    }
`

const Like = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    row-gap: 10px;

    img {
        width: 20px;
    }

    span {
        font-size: 11px;
        color: #fff;
    }

`