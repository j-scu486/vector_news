
import { useState, useContext } from 'react'
import { WebContext } from '../context'

const Modal = ({ updateNews }) => {
    const [url, setUrl] = useState('')
    const [postDecription, setpostDecription] = useState('')
    const [postTitle, setpostTitle] = useState('')
    const [tags, setTags] = useState([])

    const site = useContext(WebContext)

    const handleSubmit = (e) => {
       e.preventDefault()
       sendPost()
    }

    const handleTags = (e) => {
        if (e.target.checked) {
            setTags([...tags, e.target.value])
        } else {
            setTags(tags.filter(tag => tag !== e.target.value))
        }
        
    }
    const sendPost = () => {
        fetch(`${site}api/post/create/1`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
              },
            body: JSON.stringify(
                {
                    'post_title': postTitle,
                    'post_description': postDecription,
                    'tags': tags,
                    'post_url': url
                }
            ),
        })
        .then(() => {
            updateNews()
        })
    }

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <label>URL</label>
                <input type="text" onChange={(e) => setUrl(e.target.value)} />
                <label>Post Description</label>
                <input type="text" onChange={(e) => setpostDecription(e.target.value)} />
                <label>Post Title</label>
                <input type="text" onChange={(e) => setpostTitle(e.target.value)} />

                <div>
                    <input 
                        type="checkbox" 
                        id="html" 
                        onChange={(e) => handleTags(e)}
                        value="html" 
                    />
                    <label>html</label>
                </div>
                <div>
                    <input 
                        type="checkbox" 
                        id="javascript" 
                        onChange={(e) => handleTags(e)}
                        value="Javascript" 
                    />
                    <label>Javascript</label>
                </div>
                <input type="submit" value="submit" />
            </form>
        </div>
    )
}

export default Modal
