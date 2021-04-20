import { useContext } from 'react'
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'


export default function Card({ item, setModal, setuserInfo, setcurrentModal }) {
    const site = useContext(WebContext)
    const { user } = useContext(UserContext)

    let headers = new Headers()
    headers.set('Authorization', 'Bearer ' + `${user.token}`)
    headers.set('Content-type', 'application/json')

    const addRemoveLike = async (id) => {
        fetch(`${site}api/post/like`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ "post_id": `${id}`})
        })
        .then(res => res.json())
        .then(res => console.log(res))
    }

    return (
        <li className="card"> 
            <img src={item.post_image} />
            <h3 className="card__title">{item.post_title}</h3>
            <p className="card__description">"{item.post_description}"</p>
            <p>{item.like_count}</p>
            <button className="btn--card" onClick={() => {
                setModal(true)
                setuserInfo(`${item.post_user_id}`)
                setcurrentModal('userInfo')
            }}>
                user
            </button>
            <button onClick={() => addRemoveLike(item.id)}>Like</button>
        </li>
    )
}
