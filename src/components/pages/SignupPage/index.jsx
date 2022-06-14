import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

import PageContainer from "../../Resources/StyleAuthentication";
import TitleAuthentication from "../../Resources/StyleTitleAuthentication.jsx";

export default function LoginPage() {

    const [data, setData] = useState({ name: null, email: null, password: null, repeat_password: null });

    function HandleSubmit(e) {

        e.preventDefault();

        if (data.password !== data.repeat_password) return alert("Passwords do not match");
        setData({ ...data, [e.target.name]: e.target.value });
    }

    return (
        <PageContainer>
            <TitleAuthentication />
            <div className="login-content">
                <div className="input-container">
                    <form onSubmit={HandleSubmit}>
                        <input type='text' placeholder='name' required
                            onChange={e => setData({ ...data, name: e.target.value })} />
                        <input type='text' placeholder='email' required
                            onChange={e => setData({ ...data, email: e.target.value })} />
                        <input type='password' placeholder='password' required
                            onChange={e => setData({ ...data, password: e.target.value })} />
                        <input type='password' placeholder='confirm password' required
                            onChange={e => setData({ ...data, repeat_password: e.target.value })} />
                        <button type='submit'>Sign Up</button>
                        <Link to='/'>Already have an account ? Sign In !</Link>
                    </form>
                </div>
            </div>
        </PageContainer>
    )
}