import PostModal from './PostModal'
import UserModal from './UserModal'

const Modal = ({ updateNews, modalType, userId, setModal }) => {

    return (
        <div className="modal">
            {modalType === 'newPost' && <PostModal updateNews={updateNews} setModal={setModal}  />}
            {modalType === 'userInfo' && <UserModal userId={userId}/>}
        </div>
    )
}

export default Modal
