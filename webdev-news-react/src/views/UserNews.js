import { useState, useEffect, useContext } from 'react'
import { CSSTransition } from 'react-transition-group';
import { WebContext } from '../context'
import Modal from '../components/Modal'

const UserNews = () => {
    const [news, setNews] = useState([])
    const [modal, setModal] = useState(false)
    const site = useContext(WebContext)

    useEffect(() => {
        updateUserNews()
    }, [])

    const fetchUserNews = async () => {

        const res = await fetch(`${site}/api/posts`)
        const data = await res.json()
        console.log(data.items)
        return data.items
    }

    const updateUserNews = async () => {
        const results = await fetchUserNews()
        setNews([...results])
    }
    
    return (
        <div>
            <div onClick={() => {setModal(!modal)}} className={  `modal-container ${modal ? 'modal-active' : ''}`} ></div>
            <ul>
            {news.map((item, index) => {
                return (
                    <li key={index}> 
                        {item.post_title}
                    </li>
                )
            })}
            </ul>
            <CSSTransition
                in={modal}
                timeout={300}
                classNames="fade"
                unmountOnExit
            >
                <Modal updateNews={updateUserNews} onClose={() => setModal(false)} />
            </CSSTransition>
            <button onClick={() => { setModal(!modal) }}>Add Post</button>

        </div>
    )
}

export default UserNews
