import PostModal from './PostModal'
import UserModal from './UserModal'

const Modal = ({ updateNews, modalType, userId }) => {

    return (
        <div className="modal">
            {modalType === 'newPost' && <PostModal updateNews={updateNews} />}
            {modalType === 'userInfo' && <UserModal userId={userId}/>}
        </div>
    )
}

export default Modal
