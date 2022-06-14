import styled from "styled-components";

const PageContainer = styled.div`

    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Oswald:wght@300;400;700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Passion+One:wght@400;700;900&display=swap');

    width: 100%;
    height: 100vh;

    display: flex;
    flex-direction: column;

    .title-container {

        width: 100%;
        height: 20%;
        background-color: #000000;

        .content {

            width: 100%;
            height: 100%;

            text-align: center;
            
            h1 {
                font-family: 'Passion One';
                font-weight: 700;
                font-size: 76px;
                line-height: 84px;
                letter-spacing: 0.05em;
                color: #FFFFFF;
            }

            h2 {
                font-family: 'Oswald';
                font-weight: 700;
                font-size: 23px;
                line-height: 34px;
                text-align: center;
                color: #FFFFFF;
            }
        }
    }

    .login-content {

        width: 100%;
        height: 80%;
        background-color: #333333;

        .input-container {

            width: 100%;
            height: 60%;

            form {

                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                input {

                    padding-left: 20px;
                    width: 85%;
                    height: 15%;
                    background: #FFFFFF;
                    margin-bottom: 2%;
                    border-radius: 4px;

                    font-family: 'Oswald';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 27px;
                    line-height: 40px;
                    color: #9F9F9F;
                }

                button {
                
                    width: 85%;
                    height: 15%;
                    background: #1877f2;
                    border: none;
                    cursor: pointer;
                    border-radius: 4px;

                    font-family: 'Oswald';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 22px;
                    line-height: 33px;
                    color: #FFFFFF;
                }

                a {

                    cursor: pointer;
                    margin-top: 5%;
                    
                    font-family: 'Lato';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 20px;
                    line-height: 24px;
                    text-decoration-line: underline;
                    color: #FFFFFF;
                }

            }
        }
    }

    @media (min-width: 650px) {

        flex-direction: row;

        .title-container {

            width: 70%;
            height: 100%;

            .content {

                width: 50%;
                height: 50%;
                margin-top: 15%;

                h1 {
                    font-size: 106px;
                    line-height: 117px;
                    letter-spacing: 0.05em;
                }
                h2 {
                    margin-left: 30%;
                    font-weight: 700;
                    font-size: 43px;
                    line-height: 64px;
                }
            }
        }

        .login-content {

            width: 30%;
            height: 100%;

            .input-container {

                width: 100%;
                height: 60%;
                margin-top: 15%;
            }
            
        }
    }
`;

export default PageContainer;