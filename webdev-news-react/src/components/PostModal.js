
import { useState, useContext } from 'react'
import { WebContext } from '../webContext'
import { UserContext } from '../userContext'

const PostModal = ({ updateNews }) => {
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

        fetch(`${site}api/post/create`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postDetails)
        })
        .then(() => {
            updateNews()
        })
        
    }

    return (
<div className="modal">
            <form onSubmit={handleSubmit}>
                <label>URL</label>
                <input type="text" onChange={(e) => setpostDetails({...postDetails, post_url: e.target.value})} />
                <label>Post Description</label>
                <input type="text" onChange={(e) => setpostDetails({...postDetails, post_description: e.target.value})} />

                <div>
                    <input 
                        type="checkbox" 
                        id="html" 
                        onChange={(e) => handleTags(e)}
                        value="html" 
                    />
                    <label>HTML</label>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        id="javascript" 
                        onChange={(e) => handleTags(e)}
                        value="javascript" 
                    />
                    <label>Javascript</label>
                </div>
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default PostModal