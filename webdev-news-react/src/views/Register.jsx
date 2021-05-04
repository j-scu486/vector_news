import { useState, useContext } from 'react'
import { UserContext } from '../userContext'
import { WebContext } from '../webContext'
import { useHistory } from "react-router-dom"
import { MessageContext } from '../messageContext'
import Message from '../components/Message'

export const Register = () => {
    let history = useHistory();
    const site = useContext(WebContext);
    const {setMessage} = useContext(MessageContext)
    const [imageInfo, setImageInfo] = useState(null)
    const [registerInfo, setRegisterInfo] = useState({
        'email': '',
        'username': '',
        'password': '',
        'image_file': ''
    })
    const {user, setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = new FormData()
        let headers = new Headers()
        headers.set('Authorization', 'Basic ' + window.btoa(registerInfo.email + ":" + registerInfo.password))
        data.append('file', imageInfo)

        fetch(`${site}api/user/register`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(registerInfo)
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                setMessage({
                    message: res.error,
                    messageType: 'error'
                })
                throw new Error(res.error);
            } 
        })
        .then(() => {
            fetch(`${site}api/user/register/image`, {
                method: 'POST',
                body: data
            })
        })
        .then(() => {
            const res = fetch(`${site}api/tokens`, {
                method: 'POST',
                headers: headers
            })

            return res
        })
        .then(res => res.json())
        .then(res => {
            setUser({
                username: res.username,
                token: res.token,
                user_id: res.user_id
            })
            setMessage({
                message: `Thanks for registering, ${res.username}! Have fun!`,
                messageType: "success"
            })
            history.push("/")
        })
        .catch(error => console.log(error))
    }

    return (
        <div id="register">
            <Message />
            <div className="container">
                <form className="form form--register" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input className="form__input" id="email" type="text" onChange={(e) => setRegisterInfo({...registerInfo, email: e.target.value})} />
                    <label htmlFor="username">Username</label>
                    <input className="form__input" id="username" type="text" onChange={(e) => setRegisterInfo({...registerInfo, username: e.target.value})} />
                    <label htmlFor="password">Password</label>
                    <input className="form__input" id="password" type="password" onChange={(e) => setRegisterInfo({...registerInfo, password: e.target.value})} />
                    <input type="file" onChange={(e) => {
                        setImageInfo(e.target.files[0])
                        setRegisterInfo({...registerInfo, image_file: e.target.files[0].name})
                        }} />
                    <input className="btn btn--submit" type="submit" value="Register" />
                </form>
            </div>
        </div>
    )
}

export default Register