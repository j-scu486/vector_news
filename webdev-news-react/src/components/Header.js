import { UserContext } from '../userContext'
import { useContext } from 'react'

const Header = () => {
    const {user, setUser} = useContext(UserContext)

    return (
        <header>
            { user.user_id && <p>Hi, {user.user_id}!</p>}
        </header>
    )
}

export default Header
