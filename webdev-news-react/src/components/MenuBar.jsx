import { useContext } from 'react'
import { WebContext } from '../webContext'

export const MenuBar = ({ setfilteredNews, setnextPage, setprevPage }) => {
    const site = useContext(WebContext)

    const handleFilters = async (e) => {
        let res = await fetch(`${site}api/posts/${e.target.innerText.toLowerCase()}`)
        let data = await res.json()

        setnextPage(data._links.next)
        setprevPage(data._links.prev)
        setfilteredNews([...data.items])
    }
    
    return (
        <div className='menubar'>
            <button className='menuitem menuitem--javascript' onClick={handleFilters}>Javascript</button>
            <button className='menuitem menuitem--html' onClick={handleFilters}>HTML</button>
            <button className='menuitem menuitem--css' onClick={handleFilters}>CSS</button>
        </div>
    )
}

export default MenuBar
