import { useContext, useState } from 'react'
import { WebContext } from '../webContext'

export const MenuBar = ({ setfilteredNews, setnextPage, setprevPage }) => {
    const tagsList = [
        'Javascript',
        'HTML',
        'CSS'
    ]
    const site = useContext(WebContext)
    const [active, setActive] = useState('')

    const buttonActive  = e => setActive(e.target.innerText.toLowerCase())

    const handleFilters = async (e) => {
        let res = await fetch(`${site}api/posts/${e.target.innerText.toLowerCase()}`)
        let data = await res.json()

        setnextPage(data._links.next)
        setprevPage(data._links.prev)
        setfilteredNews([...data.items])
    }
    
    return (
        <div>
            {tagsList.map((item, index) => {
                return (
                    <button 
                        key={index} 
                        className={'menuitem ' + (active === item.toLowerCase() ? 'menuitem--active' : '')}
                        onClick={(e) => {handleFilters(e); buttonActive(e)}}
                        >{item}</button>
                )
            })}
        </div>
    )
}

export default MenuBar
