import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__links">
                <p>Created by Joseph Scutella</p>
                <a className="footer__link" href="https://www.josephscutella.com" target="blank" rel="noopener">
                    Portfolio <FontAwesomeIcon icon={faExternalLinkAlt}></FontAwesomeIcon>
                </a>
            </div>
        </footer>
    )
}

export default Footer
