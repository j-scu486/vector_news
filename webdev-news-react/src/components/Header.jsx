import { UserContext } from '../userContext'
import { WebContext } from '../webContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

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
                    { user.user_id && <p>Hi, {user.username}!</p>}
                    { !user.user_id 
                        ? <Link className="btn btn--login" to="/login">Login</Link>  
                        : <button className="btn btn--login" onClick={handleLogout}>Logout</button>
                    }
                    {!user.user_id && <Link className="btn btn--register" to="/register">Register</Link>}
                </div>
            </nav>
        </header>
    )
}

export default Header
