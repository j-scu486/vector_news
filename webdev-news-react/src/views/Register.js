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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setRegisterInfo({...registerInfo, email: e.target.value})} />
                <input type="text" onChange={(e) => setRegisterInfo({...registerInfo, username: e.target.value})} />
                <input type="password" onChange={(e) => setRegisterInfo({...registerInfo, password: e.target.value})} />
                <input type="submit" value="register" />
            </form>
        </div>
    )
}

export default Register