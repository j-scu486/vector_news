import { useState, useEffect, useContext } from 'react'
import { WebContext } from '../context'

const UserNews = () => {
    const [news, setNews] = useState([])
    const site = useContext(WebContext)

    useEffect(() => {
        const getUserNews = async () => {
            const results = await fetchUserNews()
            setNews(results)
        }
        getUserNews()
    }, [])

    const fetchUserNews = async () => {

        const res = await fetch(`${site}/api/posts`)
        const data = await res.json()
        
        return data.items
    }
    
    return (
        <ul>
            {news.map((item, index) => {
                return (
                    <li key={index}> 
                        {item.post_title}
                    </li>
                )
            })}
        </ul>
    )
}

export default UserNews
