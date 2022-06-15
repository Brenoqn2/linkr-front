import axios from "axios"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import styled from "styled-components"

export default function TimelinePage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    link: "",
    content: "",
    loading: false,
  })
  const API = "https://linkr-back-brenoqn2.herokuapp.com/"
  //mudar para rota .env do deploy vercel

  function disabledInput() {
    return (
      <>
        <input value={formData.link} disabled />
        <input className="link" value={formData.content} disabled />
      </>
    )
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    // localStorage.removeItem('kento');
    setFormData({ ...formData, loading: true })

    axios
      .post(`${API}/post`, {
        link: formData.link,
        content: formData.content,
      })
      .then((res) => {
        console.log(res)
        // localStorage.setItem("kento", res.data.token)
        // navigate("/timeline")
      })
      .catch((e) => {
        alert("Houve um erro ao publicar seu link")
        console.log(`ops !\n\n${e.response.data}`)
        setFormData({ ...formData, loading: false })
      })
  }

  return (
    <TimelineContainer>
      <p>timeline</p>
      <PostCreator onSubmit={handleSubmit}>
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
      </PostCreator>
    </TimelineContainer>
  )
}

const TimelineContainer = styled.main`
  width: 100%;
  height: 100vh;
  background-color: #e5e5e5;
`

const PostCreator = styled.form`
  width: 100%;
  height: 164px;
  padding: 10px 15px;
  word-break: break-all;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  background-color: #ffffff;
  p {
    font-weight: 300;
    font-size: 17px;
    line-height: 20px;
    text-align: center;
    margin-bottom: 10px;

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
`

const Button = styled.div`
  display: flex;
  width: 100%;

  justify-content: flex-end;
  button {
    width: 112px;
    height: 22px;

    background: #1877f2;
    border-radius: 5px;
    border: none;

    font-weight: 700;
    font-size: 13px;
    line-height: 16px;
    text-align: center;

    color: #ffffff;
  }
`
