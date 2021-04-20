import { useState, useEffect, useContext } from 'react'
import { CSSTransition } from 'react-transition-group';
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'
import MenuBar from '../components/MenuBar'
import Modal from '../components/Modal'
import Card from '../components/Card'

const UserNews = () => {
    const [news, setNews] = useState([])
    const [filteredNews, setfilteredNews] = useState([])
    const [modal, setModal] = useState(false)
    const [userInfo, setuserInfo] = useState('')
    const [currentModal, setcurrentModal] = useState('')

    // Pagination
    const [nextPage, setnextPage] = useState('')
    const [prevPage, setprevPage] = useState('')

    const site = useContext(WebContext)
    const {user, setUser} = useContext(UserContext)

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
    
    return (
        <div id="usernews">
            <MenuBar 
                news={news}
                setfilteredNews={setfilteredNews}
                setnextPage={setnextPage}
                setprevPage={setprevPage}
            />
            <div onClick={() => {setModal(!modal)}} className={`modal-container ${modal ? 'modal-active' : ''}`} ></div>
            <ul className="container">
            {filteredNews.map((item, index) => {
                return (
                    <Card 
                        key={index}
                        item={item}
                        setModal={setModal}
                        setuserInfo={setuserInfo}
                        setcurrentModal={setcurrentModal}
                    />
                )
            })}
            {!filteredNews.length && <p className="emptyResults">No results! :{'('}</p>}
            </ul>
            <div>
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
