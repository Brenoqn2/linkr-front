import axios from "axios";
import styled from "styled-components";
import { useState, useEffect, useCallback, useRef } from "react";
import dotenv from "dotenv";

import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";

dotenv.config();

export default function EditPost({ setIsActive, data, content, setContent }) {
  const API = process.env.REACT_APP_API;
  const header = GetTokenAndHeaders("headers");
  const [formData, setFormData] = useState({
    content,
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
        `${API}/post/${data.id}`,
        {
          link: data.link,
          content: formData.content,
        },
        header
      )
      .then((res) => {
        setContent(formData.content);
      })
      .catch((e) => {
        alert("Houve um erro ao publicar seu link");
        console.log(`ops !\n\n${e.response.data}`);
      })
      .finally(() => {
        setIsLoading(false);
        setIsActive(false);
      });
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
