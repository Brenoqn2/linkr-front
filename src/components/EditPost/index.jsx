import axios from "axios";
import styled from "styled-components";
import { useState, useContext, useEffect, useCallback, useRef } from "react";

import config from "../../config/config.json";
import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";

export default function EditPost({ setIsActive, data }) {
  const header = GetTokenAndHeaders("headers");
  const [formData, setFormData] = useState({
    content: data.content,
  });
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsActive(false);
    }
  }, []);

  useEffect(() => {
    inputRef.current.focus();
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put(
        `${config.API}/post/${data.id}`,
        {
          link: data.link,
          content: formData.content,
        },
        header
      )
      .then((res) => {
        setIsLoading(false);
        setIsActive(false);
      })
      .catch((e) => {
        alert("Houve um erro ao publicar seu link");
        setIsLoading(false);
        console.log(`ops !\n\n${e.response.data}`);
      })
      .finally(() => window.location.reload(true));
  }

  if (isLoading)
    return (
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          name="content"
          onChange={handleChange}
          value={formData.content}
          disabled
          type="text"></Input>
      </form>
    );
  else
    return (
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          name="content"
          onChange={handleChange}
          value={formData.content}
          type="text"></Input>
      </form>
    );
}

const Input = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 10px;

  background: #ffffff;
  border-radius: 7px;
`;
