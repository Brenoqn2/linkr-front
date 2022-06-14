import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    // import fonts
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Oswald:wght@300;400;700&display=swap');

    * {
        box-sizing: border-box;
        font-family: 'Lato', sans-serif;
    }

    h1 {
        font-family: 'Oswald', sans-serif;
    }
`

export default GlobalStyle;