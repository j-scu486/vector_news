import { useState, useContext } from 'react'
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'
import { MessageContext } from '../messageContext'
import { useHistory } from "react-router-dom";
import Message from '../components/Message'

const Login = () => {
    let history = useHistory();
    const [disableBtn, setdisableBtn] = useState(false)
    const [loginInfo, setloginInfo] = useState({
        'email': '',
        'password': ''
    })
    const { setUser } = useContext(UserContext)
    const site = useContext(WebContext)
    const { setMessage } = useContext(MessageContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        setdisableBtn(true)
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
                console.log(res)
                setUser({
                    username: res.username,
                    token: res.token,
                    user_id: res.user_id
                })
                setMessage({
                    message: `Welcome back ${res.username}!`,
                    messageType: "success"
                })
                history.push("/")
            }
            else {
                setdisableBtn(false)
                setMessage({
                    message: "Invalid username or password",
                    messageType: "error"
                })
            }
        })        
    }

    return (
        <div id="login">
            <Message />
            <div className="container">
                <h2 className="login__title">Login</h2>
                <form className="form form--login" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className="form__input" type="text" id="email" onChange={(e) => setloginInfo({...loginInfo, email: e.target.value})} />
                    <label htmlFor="password">Password</label>
                    <input className="form__input" type="password" htmlFor="password" onChange={(e) => setloginInfo({...loginInfo, password: e.target.value})} />
                    <input className={'btn btn--submit ' + (disableBtn ? 'btn--disabled' : '' )} type="submit" value="Login" />
                </form>
            </div>
        </div>
    )
}

export default Login
