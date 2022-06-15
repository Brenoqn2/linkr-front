export default function ValidateThisEmailAndPass(email, password) {

    const passwordRegex = '^[a-zA-Z0-9]{6,30}$';
    const emailRegex = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';

    if (!email.match(emailRegex)) return alert('invalid email');
    if (!password.match(passwordRegex)) return alert('invalid password');

    return true;
}