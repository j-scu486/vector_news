import { useContext } from 'react'
import { WebContext } from '../webContext'

export const MenuBar = ({ setfilteredNews, setnextPage, setprevPage }) => {
    const site = useContext(WebContext)

    const handleFilters = async (e) => {
        let res = await fetch(`${site}api/posts/${e.target.innerText}`)
        let data = await res.json()

        setnextPage(data._links.next)
        setprevPage(data._links.prev)
        setfilteredNews([...data.items])
    }
    
    return (
        <div>
            <button onClick={handleFilters}>javascript</button>
            <button onClick={handleFilters}>html</button>
            <button onClick={handleFilters}>css</button>
        </div>
    )
}

export default MenuBar
