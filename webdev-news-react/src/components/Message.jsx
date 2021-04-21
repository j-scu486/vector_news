
import { useContext } from 'react'
import { MessageContext } from '../messageContext'

export default function Message() {
    const {message} = useContext(MessageContext)
    let className = 'message'

    if (message.messageType === "success") {
        className += ' message--success'
    } else {
        className += ' message--error'
    }

    return (
        <div className={className}>
            {message.message}
        </div>
    )
}
