import { UserContext } from '../userContext'
import { WebContext } from '../webContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

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
            <nav>
                { user.user_id && <p>Hi, {user.user_id}!</p>}
                { !user.user_id 
                    ? <Link to="/login">Login</Link>  
                    : <button onClick={handleLogout}>Logout</button>
                }
                {!user.user_id && <Link to="/register">Register</Link>}
            </nav>
        </header>
    )
}

export default Header
