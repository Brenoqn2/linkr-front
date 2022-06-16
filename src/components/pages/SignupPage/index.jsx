import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import PageContainer from "../../Resources/StyleAuthentication";
import TitleAuthentication from "../../Resources/StyleTitleAuthentication.jsx";
import ValidateThisEmailAndPass from "../../Resources/ValidateEmailAndPass";
import Loader from "../../Resources/Loader";

export default function LoginPage() {

    const API = 'https://linkr-back-brenoqn2.herokuapp.com/'
    const navigate = useNavigate();
    const [data, setData] = useState({ name: null, email: null, password: null, confirmPassword: null, avatar: null });
    const [loading, setLoading] = useState(false);

    function HandleSubmit(e) {

        e.preventDefault();
        setLoading(true);

        if (ValidateThisEmailAndPass(data.email, data.password)) {

            if (data.password !== data.confirmPassword) {
                setLoading(false);
                return alert("Passwords do not match");
            }

            const userData = {
                name: data.name,
                email: data.email,
                password: data.password,
                confirmPassword: data.password,
                avatar: data.avatar ? data.avatar : 'https://i.imgur.com/62ufJYt.jpeg'
            };

            axios.post(API + 'signup', userData)
                .then(res => navigate('/'))
                .catch(err => {
                    alert(`ops !\n\n${err.response.data}`);
                })
        }
        setLoading(false);
    }

    return (
        <PageContainer>
            <TitleAuthentication />
            <div className="login-content">
                <div className="input-container">
                    <form onSubmit={HandleSubmit}>
                        <input
                            type='text'
                            placeholder='name'
                            required
                            onChange={e => setData({ ...data, name: e.target.value })} />
                        <input
                            type='text'
                            placeholder='email'
                            required
                            onChange={e => setData({ ...data, email: e.target.value })} />
                        <input
                            type='password'
                            placeholder='password'
                            required
                            onChange={e => setData({ ...data, password: e.target.value })} />
                        <input
                            type='password'
                            placeholder='confirm password'
                            required
                            onChange={e => setData({ ...data, confirmPassword: e.target.value })} />

                        <label htmlFor="file">Choose avatar</label>
                        <input type="file" id="file" hidden accept=".png"
                            onChange={e => GetAvatar(data, setData)} />

                        {loading ? Loader : <button type='submit'>Sign Up</button>}

                        <Link to='/'>Already have an account ? Sign In !</Link>
                    </form>
                </div>
            </div>
        </PageContainer>
    )
}

function GetAvatar(data, setData) {
    let max_size = 70000; // 70kb
    const file = document.getElementById('file').files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (file.size > max_size) return alert('File is too big!\nMax size is 70kb');
    reader.onload = function () {
        setData({ ...data, avatar: reader.result });
    };
}