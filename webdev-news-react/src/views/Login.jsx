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
    const [error, setError] = useState('')
    const {user, setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        let headers = new Headers()
        headers.set('Authorization', 'Basic ' + window.btoa(loginInfo.email + ":" + loginInfo.password))

        fetch(`${site}api/tokens`, {
            method: 'POST',
            headers: headers
        })
        .then(res =>  {
            if (res.ok) {
                return res.json()
            }
        })
        .then(res => {
            if (res !== undefined) {
                setUser({
                    username: res.username,
                    token: res.token,
                    user_id: res.user_id
                })
                history.push("/")
            }
            else {
                setError({"message": "Invalid username or password"})
            }
        })        
    }

    return (
        <div id="login">
            <div className="container">
                {error && <p>{error.message}</p>}
                <form className="form form--login" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className="form__input" type="text" id="email" onChange={(e) => setloginInfo({...loginInfo, email: e.target.value})} />
                    <label htmlFor="password">Password</label>
                    <input className="form__input" type="password" htmlFor="password" onChange={(e) => setloginInfo({...loginInfo, password: e.target.value})} />
                    <input className="btn btn--submit" type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}

export default Login
