import { useState, useContext } from 'react'
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'

const Login = () => {
    const site = useContext(WebContext)
    const [loginInfo, setloginInfo] = useState({
        'email': '',
        'password': ''
    })
    const {token, setToken} = useContext(UserContext)

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
            setToken({
                token: res.token,
                user_id: res.user_id
            })
        })
        
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

// Add to endpoint to API to return user info, including user id and post count
// Configure login page here. User should authenticate with basic auth (/api/tokens)
// and get a token. Token then should be stored and added to auth header on every request.
// for now, its probably enough to store in local storage (or in state)
// Also need to configure a logout endpoint: will simply revoke token and remove token from local storage

// No need at this stage for protected routes as it can be viewed publically.
// Only need auth for sending posts, and maybe some nice UI additions.

export default Login
