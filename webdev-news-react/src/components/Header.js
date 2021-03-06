import { UserContext } from '../userContext'
import { WebContext } from '../webContext'
import { useContext } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const {user, setUser} = useContext(UserContext)
    const site = useContext(WebContext)

    const handleLogout = () => {
        fetch(`${site}api/tokens/revoke/${user.user_id}`, {
            method: 'POST',
            headers: {'Content-type': 'application/json'}
        })
        .then(() => setUser({}))
    }

    return (
        <header>
            { user.user_id && <p>Hi, {user.user_id}!</p>}
            { !user.user_id ? <Link to="/login">Login</Link> : <button onClick={handleLogout}>Logout</button>}
        </header>
    )
}

export default Header
