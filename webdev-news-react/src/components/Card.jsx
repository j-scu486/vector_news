import React from 'react'

export default function Card({ item, setModal, setuserInfo, setcurrentModal }) {
    return (
        <li className="card"> 
            <img src={item.post_image} />
            <h3 className="card__title">{item.post_title}</h3>
            <p className="card__description">"{item.post_description}"</p>
            <button className="btn btn--card" onClick={() => {
                setModal(true)
                setuserInfo(`${item.post_user_id}`)
                setcurrentModal('userInfo')
            }}>
                click
            </button>
        </li>
    )
}
