import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import PageContainer from "../../Resources/StyleAuthentication";
import TitleAuthentication from "../../Resources/StyleTitleAuthentication.jsx";

export default function LoginPage() {

    const [data, setData] = useState({ email: null, password: null });

    function HandleSubmit(e) {
        e.preventDefault();
        setData({ ...data, [e.target.name]: e.target.value });
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
                        <button type='submit'>Sign In</button>
                        <Link to='/sign-up'>First time? Create an account!</Link>
                    </form>
                </div>
            </div>
        </PageContainer>
    )
}