
import { useState, useContext } from 'react'
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'

const PostModal = ({ updateNews, setModal }) => {
    const [postDetails, setpostDetails] = useState({
        'post_description': '',
        'tags': '',
        'post_url': ''
    })
    const {user, setUser} = useContext(UserContext)
    const site = useContext(WebContext)

    const handleSubmit = (e) => {
       e.preventDefault()
       sendPost()
    }

    const handleTags = (e) => {
        if (e.target.checked) {
            setpostDetails({...postDetails, tags: [...postDetails.tags, e.target.value]})
        } else {
            setpostDetails({...postDetails, tags: postDetails.tags.filter(tag => tag !== e.target.value)})
        }
        
    }
    const sendPost = () => {
        let headers = new Headers()
        headers.set('Authorization', 'Bearer ' + `${user.token}`)
        headers.set('Content-type', 'application/json')
        console.log(JSON.stringify(postDetails))

        fetch(`${site}api/post/create`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postDetails)
        })
        .then(res => {
            if (res.ok) {
                updateNews()
                setModal(false)
            } else if (res.status === 400) {
                console.log("Invalid URL or tags")
            } else if (res.status === 401) {
                console.log("Session expired. Please login again")
            } else {
                console.log("Some error occured")
            }
        })
        
    }

    return (
<div className="modal modal--post">
    <h2 className="modal--post__header">Add a post!</h2>
            <form className="form form--post" onSubmit={handleSubmit}>
                <label className="form--post__label" >URL</label>
                <input placeholder="http://" className="form--post__input" type="text" onChange={(e) => setpostDetails({...postDetails, post_url: e.target.value})} />
                <label className="form--post__label">Post Description</label>
                <textarea 
                    className="form--post__input--textarea" 
                    placeholder="What makes this site so interesting?"
                    onChange={(e) => setpostDetails({...postDetails, post_description: e.target.value})} 
                />
                <div>
                    <input 
                        className="form--post__input--checkbox"
                        type="checkbox" 
                        id="html" 
                        onChange={(e) => handleTags(e)}
                        value="html" 
                    />
                    <label>HTML</label>
                </div>
                <div>
                    <input 
                        className="form--post__input--checkbox"
                        type="checkbox" 
                        id="javascript" 
                        onChange={(e) => handleTags(e)}
                        value="javascript" 
                    />
                    <label>Javascript</label>
                </div>
                <div>
                    <input 
                        className="form--post__input--checkbox"
                        type="checkbox" 
                        id="css" 
                        onChange={(e) => handleTags(e)}
                        value="css" 
                    />
                    <label>css</label>
                </div>
                <input 
                    className="btn btn--form-post"
                    type="submit" 
                    value="submit" 
                    />
            </form>
        </div>
    )
}

export default PostModal
