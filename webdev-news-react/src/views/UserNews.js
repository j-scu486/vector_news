import { useState, useEffect, useContext } from 'react'
import { CSSTransition } from 'react-transition-group';
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'
import MenuBar from '../components/MenuBar'
import Modal from '../components/Modal'

const UserNews = () => {
    const [news, setNews] = useState([])
    const [modal, setModal] = useState(false)
    const [userInfo, setuserInfo] = useState('')
    const [currentModal, setcurrentModal] = useState('')

    const site = useContext(WebContext)
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        updateUserNews()
    }, [])

    const fetchUserNews = async () => {
        const res = await fetch(`${site}/api/posts`)
        const data = await res.json()

        return data.items
    }

    const updateUserNews = async () => {
        const results = await fetchUserNews()
        setNews([...results])
    }
    
    return (
        <div id="usernews">
            <MenuBar />
            <div onClick={() => {setModal(!modal)}} className={  `modal-container ${modal ? 'modal-active' : ''}`} ></div>
            <ul className="container">
            {news.map((item, index) => {
                return (
                    <li className="card" key={index}> 
                        <img src={item.post_image} />
                        <h3 className="card__title">{item.post_title}</h3>
                        <p className="card__description">"{item.post_description}"</p>
                        <button className="btn btn--card" onClick={() => {
                            setModal(true)
                            setuserInfo(`${item.post_user_id}`)
                            setcurrentModal('userInfo')
                        }}>
                        </button>
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
                    {currentModal === 'newPost' 
                    ?
                    <Modal 
                        modalType="newPost" 
                        updateNews={updateUserNews} 
                        onClose={() => setModal(false)} 
                    />
                    :
                    <Modal 
                        modalType="userInfo"
                        userId={userInfo} 
                        onClose={() => setModal(false)} 
                    />
                }
                </CSSTransition>

            {user.token && 
                <button onClick={() => { 
                    setModal(true) 
                    setcurrentModal('newPost')
                    }}>Add Post
                </button>
            }

        </div>
    )
}

export default UserNews
