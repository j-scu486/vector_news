import { useContext, useState } from 'react'
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'
import { MessageContext } from '../messageContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import LikeButton from './LikeButton'

export default function NewsCard({ item, setModal, setuserInfo, setcurrentModal, removePostFromList }) {
    const site = useContext(WebContext)
    const [likeList, setLikeList] = useState(item.users_liked) // To dynamically show likes without making another api call
    const { user } = useContext(UserContext)
    const { setMessage } = useContext(MessageContext)

    let headers = new Headers()
    headers.set('Authorization', 'Bearer ' + `${user.token}`)
    headers.set('Content-type', 'application/json')

    const deletePost = (id) => {
        fetch(`${site}api/post/delete`, {
            method: 'DELETE',
            headers: headers,
            body: JSON.stringify({ "post_id": `${id}`})
        })
        .then(() => {
            setMessage({
                message: "Post deleted!",
                messageType: "success"
            })
        })
        .then(() => {
            removePostFromList(id)
        })
    }

    const addRemoveLike = (id) => {
        fetch(`${site}api/post/like`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ "post_id": `${id}`})
        })
        .then(() => {
            let array = [...likeList]
            const index = likeList.indexOf(user.username)

            if (index > -1) {
                array.splice(index, 1)
            } else {
                array.push(user.username)
            }
            setLikeList(array)
        })
    }

    return (
        <li className="card">
            {item.post_user === user.username &&
                <button className="card__delete" onClick={() => deletePost(item.id)}>
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </button>}
            <a className="card__image" href={item.post_url} target="blank" rel="noopener noreferrer"> 
                <img src={item.post_image} />
            </a>
            <h3 className="card__title">{item.post_title}</h3>
            <p className="card__description">"{item.post_description}"</p>
            <div className="container--card-bottom">
                <button className="btn--card" onClick={() => {
                    setModal(true)
                    setuserInfo({
                        userId: `${item.post_user_id}`, 
                        userImg: `${item.post_user_image}`
                    })
                    setcurrentModal('userInfo')
                }}>
                <div className="card__avatar">
                    <img src={item.post_user_image} />
                </div>
                </button>
                <div className={'card__likes ' + (!user.token ? 'card__likes--logout' : '') }>
                    <p>{likeList.length} like{likeList.length === 1 ? '' : 's'}</p>
                    {user.token && 
                    <LikeButton
                        toggleLike={addRemoveLike}
                        likeNum={likeList.length} 
                        itemId={item.id}
                        liked={likeList.includes(user.username) ? false : true}
                    />}
                </div>

            </div>
        </li>
    )
}
