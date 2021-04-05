import { useState, useContext } from 'react'
import { UserContext } from '../userContext'
import { WebContext } from '../webContext'
import { useHistory } from "react-router-dom"

export const Register = () => {
    let history = useHistory();
    const site = useContext(WebContext);
    const [registerInfo, setRegisterInfo] = useState({
        'email': '',
        'username': '',
        'password': ''
    })
    const {user, setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`${site}api/user/register`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(registerInfo)
        })
        .then(() => history.push("/"))
    }

    return (
        <div id="register">
            <div className="container">
                <form className="form form--register" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className="form__input" id="email" type="text" onChange={(e) => setRegisterInfo({...registerInfo, email: e.target.value})} />
                    <label htmlFor="username">Username</label>
                    <input className="form__input" id="username" type="text" onChange={(e) => setRegisterInfo({...registerInfo, username: e.target.value})} />
                    <label htmlFor="password">Password</label>
                    <input className="form__input" id="password" type="password" onChange={(e) => setRegisterInfo({...registerInfo, password: e.target.value})} />
                    <input className="btn btn--submit" type="submit" value="Register" />
                </form>
            </div>
        </div>
    )
}

export default Register