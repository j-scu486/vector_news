import { useState, useContext } from 'react'
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'
import { useHistory } from "react-router-dom";

const Login = () => {
    let history = useHistory();
    const site = useContext(WebContext)
    const [loginInfo, setloginInfo] = useState({
        'email': '',
        'password': ''
    })
    const {user, setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        let headers = new Headers()
        headers.set('Authorization', 'Basic ' + window.btoa(loginInfo.email + ":" + loginInfo.password))

        fetch(`${site}api/tokens`, {
            method: 'POST',
            headers: headers
        })
        .then(res => res.json())
        .then(res => {
            setUser({
                token: res.token,
                user_id: res.user_id
            })
        })
        .then(() => history.push("/"))
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={(e) => setloginInfo({...loginInfo, email: e.target.value})} />
                <input type="password" onChange={(e) => setloginInfo({...loginInfo, password: e.target.value})} />
                <input type="submit" value="login" />
            </form>
        </div>
    )
}

// TODO

// Configure a logout endpoint: will simply revoke token and remove token from state
// Include token in every request
// Consider storing token in local storage to persist

// No need at this stage for protected routes as it can be viewed publically.
// Only need auth for sending posts, and maybe some nice UI additions.

export default Login
