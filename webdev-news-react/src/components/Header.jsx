import { UserContext } from '../userContext'
import { WebContext } from '../webContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo_signal.png'

const Header = () => {
    const {user, setUser} = useContext(UserContext)
    const site = useContext(WebContext)

    const handleLogout = () => {
        fetch(`${site}api/tokens/revoke`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({"token": user.token})
        })
        .then(() => setUser({}))
    }

    return (
        <header>
            <nav className="nav">
                <div className="nav__logo">
                    <Link to="/"><img src={logo} alt=""/></Link>
                </div>
                <div className="nav__links">
                    { user.token && <p>こんにちは, {user.username}!</p>}
                    { !user.token 
                        ? <Link className="btn btn--login" to="/login">ログイン</Link>  
                        : <button className="btn btn--login" onClick={handleLogout}>ログアウト</button>
                    }
                    {!user.token && <Link className="btn btn--register" to="/register">登録</Link>}
                </div>
            </nav>
        </header>
    )
}

export default Header
