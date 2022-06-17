import { useContext } from "react";
import TokenContext from "../../contexts/tokenContext";

export default function GetTokenAndHeaders(option) {

    const { token } = useContext(TokenContext);

    if (option === "token") return token
    if (option === "headers") return { headers: { authorization: `Bearer ${token}` } }
    else throw new Error("Seleciona o que vc quer !! (token ou o header com o token)");
}