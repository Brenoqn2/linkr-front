import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import TokenContext from "../../../contexts/tokenContext";

import PageContainer from "../../Resources/StyleAuthentication";
import TitleAuthentication from "../../Resources/StyleTitleAuthentication.jsx";
import ValidateThisEmailAndPass from "../../Resources/ValidateEmailAndPass";
import Loader from "../../Resources/Loader";

export default function LoginPage() {

    const API = 'https://linkr-back-brenoqn2.herokuapp.com/'
    const navigate = useNavigate();
    const [data, setData] = useState({ email: null, password: null});
    const [loading, setLoading] = useState(false);
    const { setToken } = useContext(TokenContext);

    function HandleSubmit(e) {

        e.preventDefault();
        setData({ ...data, loading: true });

        if (ValidateThisEmailAndPass(data.email, data.password)) {

            axios.post(API + 'signin', { email: data.email, password: data.password }).then(res => {
                setToken(res.data.token);
                navigate('/timeline');
            }).catch(err => {
                alert(`ops !\n\n${err.response.data}`)
            });
        }
        setLoading(false);
    }

    return (
        <PageContainer>
            <TitleAuthentication />
            <div className="login-content">
                <div className="input-container">
                    <form onSubmit={HandleSubmit}>
                        <input type='text' placeholder='email' required
                            onChange={e => setData({ ...data, email: e.target.value })} />
                        <input type='password' placeholder='password' required
                            onChange={e => setData({ ...data, password: e.target.value })} />
                        {loading ? Loader : <button type='submit'>Sign In</button>}
                        <Link to='/sign-up'>First time? Create an account!</Link>
                    </form>
                </div>
            </div>
        </PageContainer>
    )
}