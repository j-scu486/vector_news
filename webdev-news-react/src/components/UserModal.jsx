
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
        <div className="modal modal--user">
            <div className="modal__avatar">
                <img src={userImg} />
            </div>
            <h2 className="modal__username">
                {userInfo[0]?.post_user}
            </h2>
            <p className="modal__list--title">{userInfo[0]?.post_user}'s posts:</p>
            <ul className="modal__list">
            {userInfo.map((post, index) => {
                return (
                    <li className="modal__list-item" key={index}>
                        <a href={post.post_url}>{post.post_title}</a>
                    </li>
                )
            })}
            </ul>
        </div>
    )
}

export default UserModal
