
import { useState, useContext, useEffect } from 'react'
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'

const UserModal = ({ userId, userImg }) => {
    const site = useContext(WebContext)
    const {user, setUser} = useContext(UserContext)

    const [userInfo, setuserInfo] = useState([])

    useEffect(() => {
        getUsersPosts()
    }, [])

    const getUsersPosts = async () => {
        const results = await fetchUserPosts()
        setuserInfo([...results])
    }

    const fetchUserPosts = async () => {

        const res = await fetch(`${site}api/posts/${userId}`)
        const data = await res.json()

        return data.items
    }
    return (
        <div className="modal">
            <div className="modal__avatar">
                <img src={userImg} />
            </div>
            {userInfo.map((post, index) => {
                return (
                    <li key={index}>
                        {post.post_title}
                    </li>
                )
            })}
        </div>
    )
}

export default UserModal
