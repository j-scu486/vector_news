import { useState, useContext } from 'react'
import { UserContext } from '../userContext'
import { WebContext } from '../webContext'
import { useHistory } from "react-router-dom"

export const Register = () => {
    let history = useHistory();
    const site = useContext(WebContext);
    const [imageInfo, setImageInfo] = useState(null)
    const [registerInfo, setRegisterInfo] = useState({
        'email': '',
        'username': '',
        'password': '',
        'image_file': ''
    })
    const [error, setError] = useState('')
    const {user, setUser} = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        let data = new FormData()
        data.append('file', imageInfo)

        fetch(`${site}api/user/register`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(registerInfo)
        })
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                setError({
                    "message": res.error
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
        .then(() => history.push("/"))
        .catch(error => console.log(error))

    }

    return (
        <div id="register">
            <div className="container">
                {error && <p>{error.message}</p>}
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