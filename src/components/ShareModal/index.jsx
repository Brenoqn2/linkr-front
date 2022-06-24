import axios from "axios";
import styled from "styled-components";
import { useState, useContext } from "react";

import UserContext from "../../contexts/userContext";

import GetTokenAndHeaders from "../Resources/GetTokenAndHeaders";
import config from "../../config/config.json";

export default function ShareModal({ setIsActive, postId }) {
  const { userData } = useContext(UserContext);
  const API = config.API;
  const header = GetTokenAndHeaders("headers");
  const [loading, setLoading] = useState(false);

  function confirmShare() {
    setLoading(true);
    axios
      .post(`${API}/share/${postId}`, { userRepostId: userData.id }, header)
      .then((res) => {
        setLoading(false);
        setIsActive(false);
      })
      .catch((err) => console.log(err));
  }

  function cancelShare() {
    setIsActive(false);
  }

  return (
    <Modal>
      <Alert>
        <Container>Do you want to re-post this link?</Container>
        <Container>
          <button onClick={cancelShare} disabled={loading}>
            No, cancel
          </button>
          <button onClick={confirmShare} disabled={loading}>
            {loading ? "Sharing..." : "Yes, share!"}
          </button>
        </Container>
      </Alert>
    </Modal>
  );
}

const Modal = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.9);

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
`;

const Alert = styled.div`
  width: 597px;
  height: 267px;
  background-color: #333;
  border-radius: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 20px;

  @media (max-width: 640px) {
    border-radius: 0;
  }
`;

const Container = styled.div`
  &:first-child {
    font-size: 34px;
    font-weight: 700;
    color: #fff;
    text-align: center;
    width: 350px;
  }

  &:last-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
    column-gap: 20px;
  }

  button {
    width: 134px;
    height: 37px;
    border-radius: 5px;
    border: none;

    font-size: 18px;
    font-weight: 700;
  }

  button:first-child {
    background-color: #fff;
    color: #1877f2;
  }

  button:last-child {
    background-color: #1877f2;
    color: #fff;
  }
`;
