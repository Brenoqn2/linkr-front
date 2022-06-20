import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export default function ChooseAvatar(e, token) {
    const API = process.env.REACT_APP_API;
    let max_size = 70000; // 70kb
    const file = document.getElementById('change_avatar').files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (file.size > max_size) return alert('File is too big!\nMax size is 70kb');
    reader.onload = function () {

        const header = {
            headers: {
                authorization: `Bearer ${token}`,
            },
        };
        
        axios.put(`${API}/change/avatar`, { avatar: reader.result }, header)
            .then(res => {
                alert('Avatar changed successfully!');
                window.location.reload();
            }).catch(err => {
                alert('Avatar not changed!');
        });
    };
}