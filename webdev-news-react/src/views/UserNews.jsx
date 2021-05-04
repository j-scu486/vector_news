import { useState, useEffect, useContext } from 'react'
import { CSSTransition } from 'react-transition-group'
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { MessageContext } from '../messageContext'
import MenuBar from '../components/MenuBar'
import Leaderboard from '../components/Leaderboard'
import Message from '../components/Message'
import Modal from '../components/Modal'
import NewsCard from '../components/NewsCard'

const UserNews = () => {
    const [news, setNews] = useState([])
    const [filteredNews, setfilteredNews] = useState([])
    const [modal, setModal] = useState(false)
    const [userInfo, setuserInfo] = useState({
        userId: '',
        userImg: ''
    })
    const [currentModal, setcurrentModal] = useState('')

    // Pagination
    const [nextPage, setnextPage] = useState('')
    const [prevPage, setprevPage] = useState('')

    const site = useContext(WebContext)
    const {user} = useContext(UserContext)

    useEffect(() => {
        updateUserNews()
    }, [])

    const fetchUserNews = async (page) => {
        let res

        if (page) {
            res = await fetch(`${site}${page}`)
        } else {
            res = await fetch(`${site}api/posts`)
        }

        const data = await res.json()
        setnextPage(data._links.next)
        setprevPage(data._links.prev)

        return data.items
    }

    const updateUserNews = async (page) => {
        const results = await fetchUserNews(page)
        setNews([...results])
        setfilteredNews([...results])
    }

    const removePostFromList = (id) => {
        let array = [...filteredNews]

        const item = filteredNews.filter(item => item.id === id)
        const index = filteredNews.indexOf(item[0])

        if (index > -1) {
            array.splice(index, 1)
            setfilteredNews(array)
        }
    }

    
    return (
        <div id="usernews" className="usernews">
            <Message />
            <div onClick={() => {setModal(!modal)}} className={`modal-container ${modal ? 'modal-active' : ''}`} ></div>
            <div className="grid-container">
            <div className="menubar">
                <MenuBar 
                    news={news}
                    setfilteredNews={setfilteredNews}
                    setnextPage={setnextPage}
                    setprevPage={setprevPage}
                />
                {user.token && 
                    <button onClick={() => { 
                        setModal(true) 
                        setcurrentModal('newPost')
                        }}
                        className="btn btn--add-post"
                        >Add Post <FontAwesomeIcon style={{ marginLeft: 10, fontSize: 20 }} icon={faPlusCircle}></FontAwesomeIcon>
                    </button>
                }
            </div>
                <ul className="container">
                    {filteredNews.map((item, index) => {
                        return (
                            <NewsCard 
                                key={index}
                                item={item}
                                setModal={setModal}
                                setuserInfo={setuserInfo}
                                setcurrentModal={setcurrentModal}
                                removePostFromList={removePostFromList}
                            />
                        )
                    })}
                </ul>
                <Leaderboard />
            </div>
            {!filteredNews.length &&                 
                    <div className="loading">
                        <div className="loading__circle loading__circle--1"></div>
                        <div className="loading__circle loading__circle--2"></div>
                        <div className="loading__circle loading__circle--3"></div>
                    </div>}
            <div className="pagination">
                {prevPage && <button className="btn btn--pagination" onClick={() => updateUserNews(prevPage)}>Prev Page</button>}
                {nextPage && <button className="btn btn--pagination" onClick={() => updateUserNews(nextPage)}>Next Page</button>}
            </div>
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
                        setModal={setModal}
                        onClose={() => setModal(false)} 
                    />
                    :
                    <Modal 
                        modalType="userInfo"
                        userId={userInfo.userId} 
                        userImg={userInfo.userImg}
                        onClose={() => setModal(false)} 
                    />
                }
                </CSSTransition>
        </div>
    )
}

export default UserNews
