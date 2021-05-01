import Lottie from 'react-lottie';
import * as animationData from '../stylesheets/vendors/6970-like.json'
import { useState } from 'react'

export default function LikeButton({ liked, toggleLike, itemId }) {
    const [stopped, setStopped] = useState(liked)
    const [direction, setDirection] = useState(1)

    const defaultOptions = {
        loop: false,
        autoplay: false,
        animationData: animationData.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };

      const toggleAnimation = () => {
        toggleLike(itemId)
        
        if (!stopped) {
          setDirection(direction * -1)
        }
          setStopped(false)
      }

      const lottieStyle = {
          cursor: 'pointer',
          display: 'flex',
          paddingBottom: '6px',
          paddingLeft: '5px'
      }

    return (
        <div 
          style={lottieStyle}
          onClick={toggleAnimation}
          >                
            <Lottie options={defaultOptions}
                    height={37}
                    width={60}
                    direction={direction}
                    isStopped={stopped}
                    />
                        
        </div>
    )
}
