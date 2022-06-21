import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useViewportWidth } from "../../hooks/useViewportWidth";
import ReactHashtag from "@mdnm/react-hashtag";
import styled from "styled-components";

import DeleteModal from "../DeleteModal";
import EditPost from "../EditPost";
import Like from "../Like/index";
import Comments from "../Comments";

import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";
import UserContext from "../../contexts/userContext";

import defaultImage from "../../assets/images/defaultImage.jpg";
import editIcon from "../../assets/images/edit.svg";
import deleteIcon from "../../assets/images/trash.svg";
import commentsIcon from "../../assets/images/comments.svg";

import config from "../../config/config.json";

export default function Post({ data }) {
  const API = config.API;
  const navigate = useNavigate();
  const screenWidth = useViewportWidth();
  const [metadata, setMetadata] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [content, setContent] = useState(data.content);
  const [comments, setComments] = useState(null);
  const { userData } = useContext(UserContext);
  const header = GetTokenAndHeaders("headers");

  // busca os metadados do link
  useEffect(() => {
    axios
      .get(`${API}/posts/${data.id}/metadata`, header)
      .then((response) => {
        setMetadata(response.data);
      })
      .catch((err) => console.log(err));
  }, [data]);

  function addDefaultImg(e) {
    e.target.src = defaultImage;
  }

  function redirectToUser() {
    navigate(`/users/${data.userId}`, {
      state: { username: data.username },
    });
  }

  function getComments() {
    axios.get(`${API}/post/${data.id}/comments`)
        .then(response => {
            setComments(response.data);
        })
        .catch(err => {
            console.log(err);
            console.log('Error while recieving comments');
        })
  }

  function shortenText(text, charsMax) {
    let shortenText = text.split(/[\s,.]+/);
    if (shortenText.length >= charsMax) {
      shortenText.splice(charsMax);
      shortenText = shortenText.join(" ");

      if (shortenText[shortenText.length - 1] === ".")
        shortenText = shortenText.slice(0, -1);
      return shortenText + "...";
    }
    return text;
  }

  function editPost() { // setEditIput(!editIput)
    setEditInput(!editInput)
  }

  function deletePost() {
    setDeleteModal(true);
  }

  function postOptionsBuilder() {
    if (data.userId === userData.id) {
      return (
        <Options>
          <img src={editIcon} alt="Edit" onClick={() => editPost(data.id)} />
          <img
            src={deleteIcon}
            alt="Delete"
            onClick={() => deletePost(data.id)}
          />
        </Options>
      );
    }
  }

  function postContentBuilder() {
    if (editInput) {
      return <EditPost data={data} setIsActive={setEditInput} content={content} setContent={setContent} />;
    } else {
      return (
        <ReactHashtag
          renderHashtag={(val) => (
            <Hashtag
              key={val}
              onClick={() => navigate(`/hashtag/${val.replace("#", "")}`)}
            >
              {val}
            </Hashtag>
          )}>
          {content}
        </ReactHashtag>
      );
    }
  }
  
  const postOptions = postOptionsBuilder();
  const postContent = postContentBuilder();

  return (
    <>
      {deleteModal ? (
        <DeleteModal id={data.id} setIsActive={setDeleteModal} />
      ) : undefined}

      <PostItem>
        <div>
          <Container>
            <UserPicture onClick={redirectToUser} url={data.picture} />
            <Like postId={data.id} />
            <CommentsIcon>
              <img src={commentsIcon} alt="comments" />
              <span>3 comments</span>
            </CommentsIcon>
          </Container>
          <Container>
            <Head>
              <UserName onClick={redirectToUser}>{data.username}</UserName>
              {postOptions}
            </Head>
            <Desc>{postContent}</Desc>
            <LinkSnippet onClick={() => window.open(data.link, "_blank")}>
              <div>
                <h2>
                  {metadata?.title && screenWidth <= 600
                    ? shortenText(metadata?.title, 5)
                    : metadata?.title}
                </h2>
                <p>
                  {metadata?.description && screenWidth <= 600
                    ? shortenText(metadata?.description, 10)
                    : metadata?.description}
                </p>
                <span>{metadata?.url}</span>
              </div>
              <img
                onError={addDefaultImg}
                src={metadata?.image}
                alt={metadata?.title}
              />
            </LinkSnippet>
          </Container>
        </div>
        <Comments comments={comments}/>
      </PostItem>
    </>
  );
}

const PostItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  & > div {
    width: 95%;
    height: 276px;
    padding: 20px 20px 20px 20px;
    
    display: flex;
    column-gap: 20px;
    justify-content: flex-start;
    
    background-color: #171717;
    border-radius: 16px;
    position: relative;
    
    @media (max-width: 951px) {
      width: 100%;
    }
    
    @media (max-width: 640px) {
      border-radius: 0;
    }
  }
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
    justify-content: space-around;
    width: 100%;
  }

  @media (max-width: 640px) {
    &:last-child {
      width: 100%;
    }
  }
`;

const Head = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Hashtag = styled.span`
  display: inline;
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
`;

const UserName = styled.h2`
  font-size: 19px;
  color: #fff;
  cursor: pointer;
`;

const UserPicture = styled.div`
  width: 50px;
  height: 50px;

  border-radius: 50%;
  background-image: url(${(props) => (props.url ? props.url : defaultImage)});
  background-size: contain;
  cursor: pointer;
`;

const Desc = styled.div`
  width: 100%;
  font-size: 17px;
  color: #b7b7b7;
`;

const LinkSnippet = styled.div`
  width: 100%;
  height: 155px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;

  display: flex;
  justify-content: space-between;
  column-gap: 10px;
  cursor: pointer;

  img {
    min-width: 154px;
    max-width: 154px;
    height: 155px;
    border-radius: 0 11px 11px 0;

    background-color: #cecece;

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
      color: #cecece;
      padding-top: 5px;
    }

    p {
      font-size: 11px;
      color: #9b9595;
    }

    span {
      font-size: 11px;
      color: #cecece;
      padding-bottom: 5px;
    }
  }

  @media (max-width: 955px) {
    width: 100%;
  }

  @media (max-width: 640px) {
    height: 115px;
    width: 100%;

    img {
      min-width: 95px;
      max-width: 95px;
      height: 115px;
    }

    p {
      text-overflow: ellipsis;
      white-space: normal;
      font-size: 9px;
    }

    span {
      font-size: 9px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      max-width: 150px;
    }

    h2 {
      font-size: 11px;
    }
  }
`;

const Options = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 10px;

  img {
    width: 14px;
    cursor: pointer;
  }

  img:hover {
    transform: translate(1px, -1px);
    transition: all 0.5s ease;
  }
`;

const CommentsIcon = styled.div`
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
  width: max-content;
}
`;