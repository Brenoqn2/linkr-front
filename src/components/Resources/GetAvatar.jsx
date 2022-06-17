export default function GetAvatar(data, setData) {
    let max_size = 70000; // 70kb
    const file = document.getElementById('file').files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    if (file.size > max_size) return alert('File is too big!\nMax size is 70kb');
    reader.onload = function () {
        setData({ ...data, avatar: reader.result });
    };
}