import React from 'react'
import { WebContext } from '../webContext'
import { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'

export default function Leaderboard() {
    const site = useContext(WebContext)
    const [leaderBoard, setleaderBoard] = useState([])

    const leaderboard = async () => {
        const data = await fetch(`${site}api/leaderboard`)
        const response = await data.json()

        return response
    }

    const updateLeaderboard = (data) => {
        setleaderBoard(data)
    }

    useEffect(async () => {
        let data = await leaderboard()
        updateLeaderboard(data.leaderboard_data)
    }, [])

    return (
        <div className="leaderboard">
            <h2 className="leaderboard__title">Top posters!<FontAwesomeIcon style={{ marginLeft: 20, color: '#ffda77' }} icon={faCrown}></FontAwesomeIcon></h2>
            <ul className="leaderboard__list">
            {leaderBoard.map((item, index) => {
                return (
                    <li className="leaderboard__item" key={index}>
                        <p className="leaderboard__item--rank">{index + 1}.</p>
                        <div className="leaderboard__item--avatar">
                            <img src={item.avatar} />
                        </div>
                        <p className="leaderboard__item--username">{item.user}</p>
                        <p className="leaderboard__item--count"> {item.posts_count} posts</p>
                    </li>   
                )
            })}
            </ul>
        </div>
    )
}
