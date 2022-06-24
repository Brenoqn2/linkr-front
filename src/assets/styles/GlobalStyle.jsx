import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        box-sizing: border-box;
        font-family: 'Lato', sans-serif;
    }

    h1 {
        font-family: 'Oswald', sans-serif !important;
    }

    .infiniteScroll {
        width: 100%;
    }
`

export default GlobalStyle;