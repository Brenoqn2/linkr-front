import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";
import UserContext from "../../contexts/userContext";

import defaultImage from "../../assets/images/defaultImage.jpg";

import config from "../../config/config.json";

export default function CreatePost({ updatePosts }) {
  const API = config.API;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    link: "",
    content: "",
    loading: false,
  });

  const { userData } = useContext(UserContext);
  const header = GetTokenAndHeaders("headers");

  function disabledInput() {
    return (
      <>
        <input value={formData.link} disabled />
        <input className="link" value={formData.content} disabled />
      </>
    );
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setFormData({ ...formData, loading: true });
    axios
      .post(
        `${API}/post`,
        {
          link: formData.link,
          content: formData.content,
        },
        header
      )
      .then((res) => {
        updatePosts();
        navigate("/timeline");
      })
      .catch((e) => {
        alert("Houve um erro ao publicar seu link");
        console.log(`ops !\n\n${e.response.data}`);
      })
      .finally(() => setFormData({ link: "", content: "", loading: false }));
  }

  return (
    <PostCreator onSubmit={handleSubmit}>
      <UserPicture className="user-picture" url={userData?.picture} />

      <Container>
        <p>What are you going to share today?</p>
        {formData.loading ? (
          disabledInput()
        ) : (
          <>
            <input
              placeholder="http://..."
              name="link"
              onChange={handleChange}
              value={formData.link}
              type="text"
              required
            />
            <input
              className="link"
              placeholder="Awesome article about #javascript"
              name="content"
              onChange={handleChange}
              value={formData.content}
              type="text"
            />
          </>
        )}
        <Button>
          {formData.loading ? (
            <button disabled type="submit">
              Publishing...
            </button>
          ) : (
            <button type="submit">Publish</button>
          )}
        </Button>
      </Container>
    </PostCreator>
  );
}
const PostCreator = styled.form`
  width: 95%;
  height: 209px;
  margin-bottom: 30px;
  padding: 20px 20px;
  word-break: break-all;
  column-gap: 15px;
  display: flex;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  border: none;
  background-color: #fff;

  @media (max-width: 951px) {
    width: 100%;
  }

  @media (max-width: 640px) {
    border-radius: 0;

    .user-picture {
      display: none;
    }
  }
  p {
    font-weight: 300;
    font-size: 17px;
    line-height: 40px;
    text-align: center;

    color: #707070;
  }
  input {
    width: 100%;
    height: 30px;
    padding: 0 10px;

    background: #efefef;
    border-radius: 5px;
    border: none;

    font-size: 13px;
    margin-bottom: 5px;

    ::placeholder {
      font-family: "Lato";
      font-weight: 300;
      font-size: 13px;
      line-height: 16px;

      color: #949494;
    }
  }
  .link {
    height: 50px;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }
`;

const Container = styled.div`
  min-height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Button = styled.div`
  display: flex;
  width: 100%;

  justify-content: flex-end;
  button {
    width: 112px;
    height: 31px;

    background: #1877f2;
    border-radius: 5px;
    border: none;

    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    text-align: center;

    color: #ffffff;
  }
`;

const UserPicture = styled.div`
  display: flex;
  min-width: 50px;
  height: 50px;
  border-radius: 50%;

  background-image: url(${(props) => (props.url ? props.url : defaultImage)});
  background-size: contain;
`;
